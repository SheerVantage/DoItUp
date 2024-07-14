<script>
  // import  presistentStore from "$libs/presistent-store";
  import Project from '../../components/Project.svelte'
  // import Task from "../../components/Task.svelte";
  import { db, getList, backup, restore } from "../../lib/db";
  // import download from 'downloadjs'
  import {onMount} from 'svelte'
  // import {importDB, exportDB, importInto, peakImportFile} from "dexie-export-import";

  onMount(async ()=>{
    // await import('dexie-export-import')
    await import('../../lib/dixie-export-import/dexie-export-import')
  })

  let projects = getList('projects', '', 'Name') //liveQuery(() => db.projects.toArray())
  let tasks = getList('tasks', {Project_ID:undefined}) //liveQuery(() => db.tasks.toArray())
  
  function removeProject(data){
      // debugger
      // $projects = $projects.filter(t=>t.ID != data.ID)
      db.projects.where('ID').anyOf(data.ID).delete()
  }
  async function addProject() {
      try {
          const id = await db.projects.add({ Name: 'Project ' + ($projects.length + 1), Duration: '2.5', tasks:4 });
      } catch (error) {
          status = `Failed to add project: ${error}`;
          console.log(error)
      }
  }
  async function addTask() {
      try {
          // debugger
          const id = await db.tasks.add({ Name: 'Test Task' + ($tasks.length + 1), Duration: '2.5', tasks:4 });
      } catch (error) {
          status = `Failed to add project: ${error}`;
          console.log(error)
      }
  }
  
</script>


<div class = "rounded bg-gray-200 p-3 flex gap-1 pc-1">
  <button class = "bg-green-300 px-2" on:click = {addProject}>Create Project</button>
  <button class = "bg-green-200 px-2 ml-auto" on:click = {backup}>Backup</button>
  <!-- <button class = "bg-green-200" on:click = {restore}>Restore</button> -->
  <input type="file" on:change = {restore}>
</div>

<div class = "p-3 grid gap-2">{#each $projects || [] as data}
    <Project {data} {removeProject} />
{/each}</div>

<style>
  .grid { display:grid; grid-template-columns:repeat( auto-fit, minmax(350px, 1fr)); }
  /* .pc-1 > * {padding: 0.5rem 1rem;} */
</style>