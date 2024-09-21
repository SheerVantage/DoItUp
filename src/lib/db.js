import {nowTS, nowFull} from './utilities'
import {worker} from './store'
let $worker

worker.subscribe(value=>{
  // debugger
  $worker = value
})

export function load( table, fields, conditions = {}, orders = {}, callback ){
  // debugger
  if(typeof conditions == 'function'){
    callback = conditions 
    conditions = ''
  }
  else if (typeof orders == 'function'){
    callback = orders
    orders = ''
  }

  let params = {action:'select', table, fields, conditions, orders}
  $worker.postMessage(params)
  // executeCallback(params, callback)
  // (function(params, callback){
    $worker.onmessage = ({data}) => {
      if(data.action == 'select' && data.table == table && data.fields == fields && data.conditions == conditions && data.orders == orders)
        callback(data.rows)
    }
  // }(params, callback))
}
function executeCallback({action, table, }, callback){
  // $worker.onmessage = ({data}) => {
  //   if(data.action == 'select' && data.table == params.table && data.fields == params.fields && data.conditions == params.conditions && data.orders == params.orders)
  //     callback(data.rows)
  // }
(function(params, callback){
    $worker.onmessage = ({data}) => {
      if(data.action == 'select' && data.table == params.table && data.fields == params.fields && data.conditions == params.conditions && data.orders == params.orders)
        callback(data.rows)
    }
  }(params, callback))
}

export async function insert(table, data){
  delete data.editing
  let fields = Object.keys(data)
  let values = fields.map(field=>data[field])
  $worker.postMessage({action:'insert', table, fields, values})
}

export function remove(table, conditions){
  $worker.postMessage({action:'delete', table, conditions})
  // return db[table].where('ID').equals(id).delete()
}

export function update(table, data, conditions, callback){
  delete data.editing
  $worker.postMessage({action:'update', table, fields_values:data, conditions})
  callback && callback
}

export function execute(sql){
  // debugger
  $worker.postMessage({action:'execute', sql})
  // return db[table].where('ID').equals(id).delete()
}
//import projects from './DoItUps-2024-08-26 16_50_45.json'
let projects
export async function restore(projects){

  // debugger
  projects.data.data.forEach(async ({tableName, rows})=>{
    // execute(`truncate ${tableName};`)
    execute(`delete from ${tableName};`)
  })
  
  projects.data.data.forEach(async ({tableName, rows})=>{
    rows.forEach(row=>{
      delete(row.editing)
      // delete(row.ID)
      insert(tableName, row)
    })
  })
  // execute('ALTER TABLE projects ADD COLUMN Show_Cancelled')
  // execute('ALTER TABLE projects ADD COLUMN Show_All')
  execute("update tasks set Deleted = case when Deleted = 'true' then Deleted else 'false' end")
  execute("update tasks set Done = case when Done = 'true' then Done else 'false' end")
  execute("update tasks set Doing = case when Doing = 'true' then Doing else 'false' end")
  execute("update tasks set Cancelled = case when Cancelled = 'true' then Cancelled else 'false' end")
  execute("update tasks set Deferred = case when Deferred = 'true' then Deferred else 'false' end")
  execute("update tasks set Urgent = case when Urgent = 'true' then Urgent else 'false' end")
  execute("update tasks set Current = case when Current = 'true' then Current else 'false' end")
  execute("update tasks set Archived = case when Archived = 'true' then Archived else 'false' end")
}