<script>
  import Project from '../components/Project.svelte'
  import TaskExecution from '../components/TaskExecution.svelte'
	import Header  from '../components/Header.svelte'
	import Tab  from '../components/Tab.svelte'
	import TabControl  from '../components/TabControl.svelte'
  import { db, getList, update } from "../lib/db";
  import { title, task } from "../lib/store";
  import { nowTS, difference } from '../lib/utilities';
  import Progress from '../components/Progress.svelte'
  import {formatter} from '../components/Formatter.svelte'

  let tasks = getList('tasks', {Current:true}) //.filter(isTodaysTask), 
  let urgentTasks = []
  // let resetTasks = getList('tasks') //.filter(isTodaysTask)
  let tasksToday = []
  $: if($tasks) loadProjects()
  $title = 'Current Tasks'
  let projects = [], sessions = [], totalTime = 0, totalUrgentTime = 0, todaysTime = 0
  // function isTodaysTask(item){
  //   if(!item.DateTime_Start) return false
  //   let diff = difference(item.DateTime_Start, nowTS())
  //   return diff < 1440
  // }
  async function loadProjects(){
    totalTime = todaysTime = 0
    $tasks.forEach((item) => {
      totalTime = totalTime + (item.Duration ? item.Duration - 0 : 0)
      todaysTime = todaysTime + (item.Duration && item.Done ? item.Duration - 0 : 0)
    })
    let projectIDs = $tasks.filter(item => item.Current /*&& isTodaysTask(item)*/).map(item=>item.Project_ID);
    projects = await db.projects.where('ID').anyOf(projectIDs).toArray()
    // tasksToday = $tasks.filter(isTodaysTask)
    urgentTasks = $tasks.filter(item=>{
      return item.Urgent && !item.Done && !item.Deferred
    })
    totalUrgentTime = urgentTasks.reduce((total, item)=>{return total + (item.Duration - 0)}, 0)
  }
  function start(data){
    $task = data
    debugger
  }

</script>

<Header caption = "" logo = {"/favicon.svg"} >
  <a class = "px-2 rounded ml-auto bg-blue-300 " href = "./projects">All Projects</a>
</Header>
<!-- <div class = "w-full flex p-2 bg-gray-300"><span>DoItUp:</span><a class = "px-1 ml-auto bg-blue-300" href = "./projects">View All Projects ></a></div> -->
<section class:exec-grids = {$task} class = "h-full p-3 md:p-6 exec-grid gap-2 md:gap-4">
  <TabControl classes = "h-full" name = "main" let:isTitle let:isContent >
    <span class = "bg-blue-200 rounded-xl px-2" slot = "tools"> {formatter(todaysTime, "m2hm", true)} of {formatter(totalTime, "m2hm", true)}</span>
    <Tab label = "Now" {isTitle} {isContent}>
    {#if $task}<TaskExecution />{/if}
    </Tab>
    <Tab label = "Today" {isTitle} {isContent}>
      <table class = "w-full">
        <!-- <tr class = "text-xs"><td>Name</td><td amount>Duration</td><td>Progress</td></tr> -->
        {#each urgentTasks as ts}
          <tr class = "bg-yellow-100 rounded" class:bg-pink-200 = {$task?.ID == ts.ID}><td><a title = "Start" class = "text-blue-500" aria-hidden="true" href on:click={()=>start(ts)}>{ts.Name}</a></td><td amount> {formatter(ts.Duration, 'm2hm')}</td> <td><Progress data = {ts.Progress || ''}/></td></tr>
          <!-- <Task data = {ts}/> -->
        {/each}
        <tr class = "bg-yellow-200"><td></td><td amount>{formatter(totalUrgentTime, 'm2hm')}</td><td></td></tr>
      </table>
    </Tab>
  </TabControl>
  <div class = "h-full overflow-auto project-grid gap-6 p-4">
    {#each projects || [] as data}
      <Project mini = {true} {data} conditions = {{Current:true}}/>
    {/each}
  </div>
</section>

<style>
  .exec-grid {display:grid; grid-template-columns: 1fr 2fr;}
  td {padding: 0.3rem 0.5rem; text-align: left;}
  [amount] {text-align: right;}
</style>
