<script>
  // import  presistentStore from "$libs/presistent-store";
  import Project from '../../components/Project.svelte'
	import Header from '../../components/Header.svelte'
  // import Task from "../../components/Task.svelte";
  import { db, getList, backup, restore } from "../../lib/db";
  import { title } from "../../lib/store";
  // import download from 'downloadjs'
  import {onMount} from 'svelte'
  // import {importDB, exportDB, importInto, peakImportFile} from "dexie-export-import";

  onMount(async ()=>{
    // await import('dexie-export-import')
    await import('../../lib/dixie-export-import/dexie-export-import')
    $title = "All Projects"
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
<!-- <div class = "app-body"> -->

  <Header caption = "" logo = {"/favicon.svg"} bgColor = 'bg-blue-200'>
    <svelte:fragment slot = "tools" >
      <button class = "bg-green-300 px-2" on:click = {addProject}>Create</button>
    </svelte:fragment>
    <svelte:fragment slot = "drawer" >
    <button class = "bg-blue-200 px-2 ml-auto" on:click = {backup}>Backup</button>
    <!-- <button class = "bg-green-200" on:click = {restore}>Restore</button> -->
    <span class = "flex items-center mr-2 relative cursor-pointer bg-green-500 px-2">Restore<input class = "absolute cursor-pointer" style = "left:0; top:0; z-index:2; opacity:0; width:100%; height:100%;" type="file" on:change = {restore}></span>
    </svelte:fragment>
  </Header>

  <section class = "overflow p-3 project-grid gap-2 h-full">{#each $projects || [] as data}
      <Project {data} {removeProject} />
  {/each}</section>

<!-- </div> -->

<style>
  /* .grid { display:grid; grid-template-columns:repeat( auto-fit, minmax(350px, 1fr)); } */
</style>