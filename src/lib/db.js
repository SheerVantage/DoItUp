// db.js
import Dexie from 'dexie';
import { liveQuery } from "dexie";
// import relationships from 'dexie-relationships'  // https://stackoverflow.com/questions/36594184/dexie-js-how-to-join-tables
import download from 'downloadjs'

// export const db = new Dexie('DoItUps', {addons: [relationships]});
export let db = new Dexie('DoItUps');
let schema = {
  projects: '++ID, Name, Duration, Serial, Project_Type_ID, Priority_ID',
  features:'++ID, Name, Feature_Type_ID',
  feature_types:'++ID, Name',
  project_types:'++ID, Name, Recurrent, Period',
  // tasks: '++ID, Name, Duration, Project_ID -> projects.ID, Task_ID, Done, Serial, Archived, Deferred, Current', // Primary key and indexed props
  tasks: '++ID, Name, Duration, notes, Project_ID, Priority_ID, Task_Type_ID, DateTime_Start, DateTime_End, Task_ID,  Serial, Current, Archived, Deferred, Urgent, Doing, Done', // Primary key and indexed props
  task_types:'++ID, Name', // UI Design, Bug Fixture, Support, Correspondence, Documentation
  priorities:'++ID, Name, Color, Icon, BG',
  sessions: '++ID, Duration, Task_ID, DateTime_Start, DateTime_End, Progress, Serial, Current, Deferred, Doing, Done',
  notes: '++ID, Content, Task_ID, DateTime, Project_ID',
  organizations:'++ID, Name, Type',
  persons:'++ID, Name, Organization_ID',
}
db.version(1).stores(schema);

function intialize(){

  // insert('projects', {Name:'Daily Retuals', Project_Type_ID:1})
  // insert('projects', {Name:'Social Activities', Project_Type_ID:1})
  // insert('project_types', {Name:'Application', Recur:3})

  // insert('project_types', {Name:'Web Site', Recur:false})
  // insert('project_types', {Name:'Daily Retuals', Recur:'Daily'})
  // insert('project_types', {Name:'Occational', Recur:'Sporadically'})

  // insert('task_types', {Name:'Design / Development'})
  // insert('task_types', {Name:'Communication'})
  // insert('task_types', {Name:'Documentation'})

}
// intialize()

export function getList( table, conditions = {}, orders = {} ){
  // debugger
  return liveQuery(() => db[table].filter((item)=>{
    return createFilters(item, conditions)
  }).toArray())
}
export async function getRecords( table, conditions = {}, orders = {} ){
  // debugger
  return await db[table].filter((item)=>{
    return createFilters(item, conditions)
  }).toArray()
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
    db.version(1).stores(schema);
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