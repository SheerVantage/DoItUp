<script>
  // import  presistentStore from "$libs/presistent-store";
  import Project from '../../components/Project.svelte'
	import Header from '../../components/Header.svelte'
  // import Task from "../../components/Task.svelte";
  import { restore, load, update, remove, insert, execute } from "../../lib/db";
  import { title } from "../../lib/store";
  // import Popover from '../../components/Popover.svelte';
  // import download from 'downloadjs'
  import {onMount} from 'svelte'
  // import {worker} from '../../lib/store'
  let worker
  // import {importDB, exportDB, importInto, peakImportFile} from "dexie-export-import";

  import Worker from '$lib/worker.js?worker'
  import Restore from '../../components/Restore.svelte';
  let filters = ['Done', 'Deleted', 'Cancelled', 'Deferred', 'Archived']

    onMount(()=>{
        $title = "All Projects"
        // debugger
        // if(!$worker)
          worker = new Worker()
        // debugger
        // worker.addEventListener('message', ({data})=>{
        //   if(data.ready){
        //     // alert('===========')
        //   }
        //   else if (data.action == 'update' && data.table == 'projects'){
        //     debugger
        //   }
        // })
        worker.onmessage = ({data}) => {
        // worker.addEventListener('message', ({data})=>{
        //   debugger
            if(data.ready){
            //   $worker.postMessage({action:'select', table:'projects'})
            // }
            // else if(data.action == 'select' && data.rows){
              load('projects', '*', '', projectList =>{
                // projects = list
                let tasks = {}
                load('tasks', '*', `'true' not in (${filters.join(', ')})`, taskList => {
                    //tasks = list
                    // str += `Tasks:${data.tasks}, tasks count:${tasks.length}, TPID: ${tasks && tasks.length > 0 ? tasks[0].Project_ID : ''}`
                    //console.log(data.ID +':'+ list.length)
                    taskList.forEach(task => {
                      if(!tasks[task.Project_ID]) tasks[task.Project_ID] = []
                      tasks[task.Project_ID].push(task)
                    });
                    projectList.forEach(project => {
                      project.taskList = tasks[project.ID]
                    })
                    projects = projectList
                })
              })
            }
            else if (data.action == 'insert' && data.table == 'projects'){
              debugger
              projects = [...projects, data.row]
            }
            else if (data.action == 'update' && data.table == 'projects'){
              debugger
            }
            else{
              projects
            }
        }
      // )
    })

  let projects //= getList('projects', '', 'Name') //liveQuery(() => db.projects.toArray())
  // let tasks = getList('tasks', {Project_ID:undefined}) //liveQuery(() => db.tasks.toArray())
  
  async function addProject() {
      try {
        // worker.postMessage({action:'select', table:'projects', fields:'*'})
        insert('projects', { Name: 'new project', Duration: '0.0', tasks:0, Is_Active:true }, row=>{
          projects = [...projects, row]
        })
          // const id = await db.projects.add({ Name: 'Project ' + ($projects.length + 1), Duration: '2.5', tasks:4 });
      } catch (error) {
          status = `Failed to add project: ${error}`;
          console.log(error)
      }
  }
  // async function addTask() {
  //     try {
  //         // debugger
  //         // const id = await db.tasks.add({ Name: 'Test Task' + ($tasks.length + 1), Duration: '2.5', tasks:4 });
  //     } catch (error) {
  //         status = `Failed to add project: ${error}`;
  //         console.log(error)
  //     }
  // }

  function activate(project){
    project.Is_Active = true
    update('projects', {ID:project.ID, Is_Active:project.Is_Active})
    // projects = projects.map(item => {
    //   if(item.ID == project.ID)
    //     return project
    //   else
    //     return item
    // })
    projects = [...projects]
  }
  function removeProject(project){
      // $projects = $projects.filter(t=>t.ID != data.ID)
      // db.projects.where('ID').anyOf(data.ID).delete()
      // debugger
      if(project.Is_Active && project.Is_Active + '' == 'true'){
        project.Is_Active = false
        update('projects', {ID:project.ID, Is_Active:project.Is_Active })
        projects = [...projects]
      }
      else{
        remove('projects', `ID = ${project.ID}`)
        projects = projects.filter(item => {
          return item.ID != project.ID
        })
      }
  }

  function send(){
    worker.postMessage({action:'select', table:'projects', fields:'*'})
  }
</script>
<!-- <div class = "app-body"> -->

  <Header caption = "" logo = {"/favicon.svg"} bgColor = 'bg-blue-200'>
    <svelte:fragment slot = "tools" >
      <button class = "bg-green-300 px-2" on:click = {addProject}>Create</button>
      <!-- <Popover label = "Open op" id = "pop1">
        <div class = "bg-green-200 p-2 flex gap-1">
          <button>One</button>  
          <button>Two</button>  
          <button>Three</button>  
        </div>
      </Popover> -->
    </svelte:fragment>
    <svelte:fragment slot = "drawer" >
    <!-- <button class = "bg-blue-200 px-2 ml-auto" on:click = {backup}>Backup</button> -->
    <!-- <button class = "bg-green-200" on:click = {restore}>Restore</button> -->
    <span aria-hidden="true" class = "flex items-center mr-2 relative cursor-pointer bg-green-500 px-2" on:click = {restore}>Restore
      <!-- <input class = "absolute cursor-pointer" style = "left:0; top:0; z-index:2; opacity:0; width:100%; height:100%;" type="file" on:change = {restore}> -->
    </span>
    <Restore />
    </svelte:fragment>
  </Header>
  <button on:click = {send}>Send</button>
  <section class = "overflow p-3 project-grid gap-2 h-full">
    <div class = "project-list flex flex-col gap-1 row-span-2s bg-yellow-100 p-3 rounded-md overflow-auto">
      {#each (projects || []).filter(p => p.Is_Active != 'true' && p.Is_Active != true) as data}
        <div class = "flex gap-1 hover:bg-yellow-200">
          <span aria-hidden="true" class = "px-2 cursor-pointer" on:click = {e=>activate(data)}>{data.Name} ></span>
          <button class = "border-2 bg-red-300 px-2 ml-auto" on:click = {e=>removeProject(data)}>x</button>
        </div>
      {/each}
    </div>  
    {#each (projects || []).filter(p => p.Is_Active == 'true' || p.Is_Active == true) as data}
      <Project {data} {removeProject} {filters} />
    {/each}
  </section>

<!-- </div> -->

<style>
  /* .grid { display:grid; grid-template-columns:repeat( auto-fit, minmax(350px, 1fr)); } */
  .project-list {max-height: 20rem; min-height: 20rem; max-width: 25vw; padding: 1rem;}
  .project-list > div button {visibility: hidden; transition: visibility 200ms ease; transition-delay: 150ms;}
  .project-list > div:hover button {visibility: visible;}

</style>