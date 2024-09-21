
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
// import sqlite3InitModule from './sqlite-wasm/jswasm/sqlite3-bundler-friendly.mjs';
// import { initSqlJs } from 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/sql-wasm.js'

// const SQL = await initSqlJs({
//   // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
//   // You can omit locateFile completely when running in node
//   // locateFile: file => `https://sql.js.org/dist/${file}`
// })
// debugger

let db, debug = false
import schema from './schema.json'
// import {configs} from '$libs/store'
// import { setItem, getItem, post } from "$libs/utilities";
// debugger
export let entities = schema.tables
const log = (value, debug = false)=>{
  console.log(value)
  if( debug )
    debugger
}
// debugger
sqlite3InitModule().then( async sqlite3 => {
  // schema = await fetch('schema.json').then(r=>r.json())
  // debugger
  if('opfs' in sqlite3){
    // debugger
    // $configs = getItem('configs')
    db = new sqlite3.oo1.OpfsDb('/' + schema.db)
    postMessage({ready:true})
  }
  else{ log('OPFS is not present or available...') }

})

let entity, iid = '', row, rows = []
onmessage = async ({data})=>{
  // debugger
  if(data.action == 'init_schema'){
    schema.tables.forEach(table=>{
      table.fields = typeof table.fields == 'string' ? table.fields.split(", ") : table.fields
      if(createTable(table.name, table.fields)){
        table.values = typeof table.values == 'string' ? table.values.split(", ") : table.values
        table.values.forEach(row=>{
          let fields = table.fields.slice(0, row.length)
          if(table.name == 'transactions' && ! fields[0].startsWith("---")){
            fields.push('Date_Created')
            row.push(row.slice(-1)[0])
          }
          insert(table.name, fields, row)
        })
      }
    })
  }
  else if(data.action == 'synchronize'){

    // db.exec(`drop table if exists synchronizations`)
    // createTable('synchronizations', ['Status'])
    // insert('synchronizations', 'Status', "''")

    let tables = schema.tables.map(table => ({name:table.name}))//.filter(table => table.sync == 'true')
    let lastSynced = select('synchronizations', 'MAX(Date_Created) LSDT')[0].LSDT 
    // lastSynced = lastSynced ? lastSynced[0].LSDT : ''
    // console.log(lastSynced)
    tables = tables.map(table => {
      let records = select(table.name, "*", `Date_Created >= '${lastSynced}'`)
      return {name:table.name, records}
    }).filter(table => table.records?.length > 0)

    // log(tables)
    if(tables.length > 0){
      // let result = await post($configs.server, 'synchronize', tables)
    }

    // insert('synchronizations', 'Status', "''")

  }
  else if(data.action == 'cleanup_db'){
    // debugger
    schema.tables.forEach(table=>{
      let sql = `drop table if exists ${table.name} `
      if(table != 'transactions'){
        log(sql)
        db.exec(sql)
      }
    })

  }
  else if(data.action == 'insert'){
    let entry = data.fields
    if(!data.values && !data?.fields?.length && data.fields_values){
      data.fields = Object.keys(data.fields_values)
      data.values = Object.values(data.fields_values)
      data.values = data.values.map(value=>{
        value = value + ''
        return value ? value.replace(/'/g, "''") : ''
      })
    }
    iid = insert(data.table || data.entity, data.fields, data.values)
    entry = typeof entry == 'string' ? {Name:entry, ID: iid} : {...data.fields_values, ID:iid}
    postMessage({entity:data.entity, table:data.table, id:iid, action:data.action, row:entry})
  }
  else if(data.action == 'update'){
    data.conditions = data.conditions || `ID = ${data.fields_values.ID}`
    row = update(data.table || data.entity, data.fields_values, data.conditions)
    postMessage({entity:data.entity, row: data.row || data.fields_values, action:data.action})
  }
  else if(data.action == 'delete' || data.action == 'remove'){
    rows = remove(data.table || data.entity, data.conditions)
    postMessage({entity:data.entity, action:data.action, id:data.id})
  }
  else if(data.action == 'execute'){
    // debugger
    db.exec(data.sql)
    // data.callback(rows)
    postMessage({...data, rows})
  }
  else if(data.action == 'select'){
    rows = select(data.table || data.entity, data.fields, data.conditions, data.orders, data.log)
    // data.callback(rows)
    postMessage({...data, rows})
  }
  else if(data.action == 'selectOne'){
    rows = select(data.table || data.entity, data.fields, data.conditions, data.orders, data.log)
    postMessage({entity:data.entity, row:rows[0], action:data.action})
  }
  else if(data.action == 'confirm' && data.item){
    let entry = data.item
    // debugger
    let sql = `
    UPDATE funds
    SET Amount = f.Amount + IIF( f.ID AND p.Effect NOT IN ( '<', '>' ), IIF( p.Effect = '+', t.Amount, -t.Amount), 0 )
    FROM transactions t INNER JOIN purposes p ON p.ID = t.Purpose_ID INNER JOIN funds f on f.ID = t.Fund_ID
    WHERE t.ID = ${entry.ID} AND funds.ID = t.Fund_ID
    `
    // sql = `
    // UPDATE funds f, transactions t, purposes p
    // SET Is_Confirmed = 1, f.Amount = f.Amount + IIF( f.ID AND p.Effect NOT IN ( '<', '>' ), IIF( p.Effect = '+', t.Amount, -t.Amount), 0 )
    // WHERE t.ID = ${entry.ID} AND p.ID = t.Purpose_ID AND f.ID = t.Fund_ID
    // `
    // sql = `
    // UPDATE transactions t INNER JOIN purposes p ON p.ID = t.Purpose_ID INNER JOIN funds f on f.ID = t.Fund_ID
    // SET t.Is_Confirmed = 1, Amount = f.Amount + IIF( f.ID AND p.Effect NOT IN ( '<', '>' ), IIF( p.Effect = '+', t.Amount, -t.Amount), 0 )
    // WHERE t.ID = ${entry.ID} AND funds.ID = t.Fund_ID
    // `
    
    /*===================
    Party Treatment:
      if Party_ID exists
          entry.Effect = entry.Effect in [ -, < ] ? '+' : '-'
          party.Amount_Cedit = party.Amount_Cedit ${entry.Effect + ' ' + entry.Amount}

    Fund Treatment:  

    ===================*/

    if(entry.Fund_ID){
      entry.Amount = entry.Effect in ['-', '+'] ? entry.Amount + ' ' + entry.Amount : 
      sql = `update funds set Amount = Amount ${entry.Amount} where ID =  ${entry.Fund_ID}`
      log(sql)
      db.exec(sql)
    }

    if(entry.Party_ID){
      entry.Amount = entry.Effect in ['-', '+'] ? entry.Amount + ' ' + entry.Amount : 
      sql = `update parties set Amount_Receivable = Amount_Receivable ${entry.Amount}, Amount_Payable = Amount_Payable  where ID =  ${entry.Party_ID}`
      log(sql)
      db.exec(sql)
    }
    
    sql = `update transactions set Is_Confirmed = 1 where ID =  ${entry.ID}`
    log(sql)
    db.exec(sql)

    // UPDATE funds, parties
    // SET funds.Amount = f.Amount + IIF( f.ID AND p.Effect NOT IN ( '<', '>' ), IIF( p.Effect = '+', t.Amount, -t.Amount), 0 ),
    // parties.Amount_Receivable = parties.Amount_Receivable + IIF( f.ID AND p.Effect NOT IN ( '<', '>' ), IIF( p.Effect = '+', t.Amount, -t.Amount), 0 ),
    // parties.Amount_Payable = parties.Amount_Payable + IIF( f.ID AND p.Effect NOT IN ( '<', '>' )
    // FROM transactions t INNER JOIN purposes p ON p.ID = t.Purpose_ID INNER JOIN funds f on f.ID = t.Fund_ID
    // WHERE t.ID = ${data.item.ID} AND funds.ID = t.Fund_ID

    // let result = db.exec(sql, { rowMode: "object" })
    // log(result)
    // update(
    //   'transactions t inner join purposes p on p.ID = t.Purpose_ID inner join funds f on f.ID = t.Fund_ID', 
    //   "f.Amount = f.Amount + if( f.ID AND p.Effect not in ( '<', '>' ), if( p.Effect = '+', t.Amount, -t.Amount), 0 )",
    //   `t.ID = ${data.item.ID}`
    //   )
    // update('transactions', 'Is_Confirmed = 1', "ID = " + data.item.ID)
  }
  else {
    // console.log({ ...data, message:'worker.else' })
    postMessage({...data})
  }
}

function doesTableExist(table){

  let sql = `SELECT EXISTS (
    SELECT name
    FROM sqlite_schema
    WHERE type='table' AND name='${table}'
    ) flag;`
    let result = db.exec(sql, { rowMode: "object" })[0]
    return result['flag'] == '1'

}

function createTable(name, fields){

  if(doesTableExist(name)) return false

  let fieldsTrigger = fields.map(field=>field.name || field)
  if(!fields.includes('ID'))
    fields = ['ID', ...fields]
  fields = fields.map(field => {
    if(typeof field == 'string'){
      field = {name:field, type:'String(20)'}
      field.type = field.name == 'ID' ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : field.type
      field.type = field.name.includes('Date') ? 'Date' : field.type
      field.type = field.name.includes('_ID') ? 'INTEGER' : field.type
      field.type = field.name.includes('Is_') || field.name.includes('Has_') ? 'BOOLEAN' : field.type
      field.type = field.name.includes('Amount') ? 'DECIMAL(10, 2)' : field.type
      field.type = ['Email'].includes(field.name) ? 'STRING(60)' : field.type
      field.type = ['Mobile', 'Mobiles', 'Phone', 'Phones'].includes(field.name) ? 'STRING(30)' : field.type
      field.type = ['Particulars', 'Description', 'Remark', 'Remarks', 'Note', 'Notes'].includes(field.name) || field.name.includes('Address') ? 'TEXT' : field.type
    } 
    return `${field.name || field} ${field.type}`
  })
  let sql = `CREATE TABLE IF NOT EXISTS ${name} ( 
    ` + fields.join (', ') + `
    , Date_Created DATETIME DEFAULT ( DATETIME ( CURRENT_TIMESTAMP, 'LOCALTIME' ) )
    , Date_Modified DATETIME DEFAULT ( DATETIME ( CURRENT_TIMESTAMP, 'LOCALTIME' ) )
    )` // [WITHOUT ROWID]
  let flag = db.exec(sql)
  createTrigger(name, fieldsTrigger.join(', '))
  return true
}

function createTrigger(table, fields){
  let sql = `CREATE TRIGGER  IF NOT EXISTS Date_Modified_${table}
  AFTER UPDATE OF ${fields}
     ON ${table}
  FOR EACH ROW
    WHEN NEW.Date_Modified >= OLD.Date_Modified
  BEGIN
    UPDATE ${table} SET Date_Modified = DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')  WHERE ID = OLD.ID;
  END;`
  db.exec(sql)
}
let sql
function select(table, fields = '*', conditions = '1', orders = 1, doLog = true){
  if(!db) {
    // debugger
    return
  }
  conditions = conditions || '1'
  orders = orders || 1
  sql = `SELECT ${fields} FROM ${table} WHERE ${conditions} ORDER BY ${orders}`
  doLog && log(sql, debug)
  return db.exec(sql, { rowMode: "object" })
}

export function insert(table, fields, values){
  fields = typeof fields == 'string' ? fields : fields.join(", ")
  values = typeof values == 'string' ? values : "'"+values.map(item=>(item + '').replace(/'/g, "''")).join("', '")+ "'"
  // fields =  fields.map()
  let sql = `INSERT INTO ${table} ( ${fields} ) VALUES( ${values} )`
  log(sql, debug)
  let iid = db.exec(sql)//, { rowMode: "object" }
  if(!iid)
    iid = db.exec( `SELECT MAX(ID) ID from ${table}`, { rowMode: "object" } )[0]['ID']

  // iid = iid[0]
  // iid = iid['ID']
  // debugger

  return iid
}

function update(table, fields_values, conditions = ''){
  // debugger
  conditions = conditions ? conditions : `${table}.ID = ${fields_values.ID}`
  // delete fields_values['ID']
  fields_values = typeof fields_values == 'string' ? fields_values : Object.entries(fields_values).reduce((fv, [field, value])=>{
  // fields_values =  typeof fields_values == 'string' ? fields_values : fields_values.map(({field, value})=>{
    // debugger
    value = value + ''
    return field == 'ID' ? fv : fv + `, ${field} = '${value ? value.replace(/'/g, "''") : ''}'`
  }, '').substring(2)
  let sql = `UPDATE ${table} SET ${fields_values} WHERE ${conditions}`
  log(sql, debug)
  return db.exec(sql)
}

function remove(table, conditions = '1'){
  let sql = `DELETE FROM ${table} WHERE ${conditions}`
  log(sql, debug)
  return db.exec(sql)
}