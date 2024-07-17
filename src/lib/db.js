// db.js
import Dexie from 'dexie';
import { liveQuery } from "dexie";
// import relationships from 'dexie-relationships'  // https://stackoverflow.com/questions/36594184/dexie-js-how-to-join-tables
import download from 'downloadjs'

// export const db = new Dexie('DoItUps', {addons: [relationships]});
export let db = new Dexie('DoItUps');

db.version(1).stores({
  projects: '++ID, Name, Duration, Serial',
  // tasks: '++ID, Name, Duration, Project_ID -> projects.ID, Task_ID, Done, Serial, Archived, Deferred, Current', // Primary key and indexed props
  tasks: '++ID, Name, Duration, Project_ID, DateTime_Start, DateTime_End, Task_ID,  Serial, Current, Archived, Deferred, Doing, Done', // Primary key and indexed props
  sessions: '++ID, Duration, Task_ID, DateTime_Start, DateTime_End, Progress, Serial, Current, Deferred, Doing, Done'
});

export function getList( table, conditions = {}, orders = {} ){
  // debugger
  return liveQuery(() => db[table].filter((item)=>{
    return createFilters(item, conditions)
  }).toArray())
}

function createFilters(item, conditions = undefined={}){
  // debugger
  let cond = {}
  let keys = conditions ? Object.keys(conditions) : ''
  let flag = keys == '' ? true : keys.reduce((flag, key)=>{
    // debugger
    flag = flag && ( Array.isArray(conditions[key]) ? item[key] in conditions[key] : item[key] == conditions[key] )
    cond[key] = conditions[key]
    return flag
  }, true)
  // console.log({Name:item.Name, ...cond, flag})
  return flag
}

export async function insert(table, data){
  let {editing, ...udata} = data
  return await db[table].add(udata)
}

export function remove(table, id){
  return db[table].where('ID').equals(id).delete()
}

export function update(table, data){
  db[table].update(data.ID, data)
  // console.log(data)
}

export async function backup(){
  // debugger
  const blob = await db.export(db);
  download(blob, "doItUp-dexie-export.json", "application/json")
}

// export async function restore(){
//   await importInto(db, blob);
// }

export async function restore(ev){
  ev.stopPropagation();
  ev.preventDefault();

  // Pick the File from the drop event (a File is also a Blob):
  const file = ev.currentTarget.files[0];
  try {
    if (!file) throw new Error(`Only files can be dropped here`);
    console.log("Importing " + file.name);
    // debugger
    await db.delete();
    db = new Dexie('DoItUps')
    db.version(1).stores({
      projects: '++ID, Name, Duration, Serial',
      // tasks: '++ID, Name, Duration, Project_ID -> projects.ID, Task_ID, Done, Serial, Archived, Deferred, Current', // Primary key and indexed props
      tasks: '++ID, Name, Duration, Project_ID, Task_ID, Serial, Current, Archived, Deferred, Done', // Primary key and indexed props
    });
    // debugger
    await db.import(file)
    console.log("Import complete");
    // await showContent();
  } catch (error) {
    console.error(''+error);
  }
}

async function showContent() {
const tables = await Promise.all(db.tables.map (async table => ({
  name: table.name,
  count: await table.count(),
  primKey: table.schema.primKey.src
})))
console.log(tables)
}