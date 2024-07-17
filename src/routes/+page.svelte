<script>
  import Project from '../components/Project.svelte'
  import TaskExecution from '../components/TaskExecution.svelte'
	import Header  from '../components/Header.svelte'
	import Tab  from '../components/Tab.svelte'
	import TabControl  from '../components/TabControl.svelte'
  import Progress from '../components/Progress.svelte'
  import { db, getList } from "../lib/db";
  import { title, task } from "../lib/store";

  let tasks = getList('tasks', {Current:true})
  $: if($tasks) loadProjects()
  $title = 'Current Tasks'
  let projects = [], sessions = []
  async function loadProjects(){
    let projectIDs = $tasks.filter(item => item.Current).map(item=>item.Project_ID);
    projects = await db.projects.where('ID').anyOf(projectIDs).toArray()

  }

</script>

<Header caption = "" logo = {"/favicon.svg"} >
  <a class = "px-2 rounded ml-auto bg-blue-300 " href = "./projects">All Projects</a>
</Header>
<!-- <div class = "w-full flex p-2 bg-gray-300"><span>DoItUp:</span><a class = "px-1 ml-auto bg-blue-300" href = "./projects">View All Projects ></a></div> -->
<section class:exec-grid = {$task} class = "overflow p-3 md:p-6 grid gap-2 md:gap-4">
  <TabControl name = "main" let:isTitle let:isContent >
    <Tab label = "Now" {isTitle} {isContent}>
    {#if $task}<TaskExecution />{/if}
    </Tab>
    <Tab label = "Today" {isTitle} {isContent}>
      <table>
        <tr><td>Name</td><td>Duration</td><td>Progress</td></tr>
        <!-- {#each tasks_sessions as ts}<tr><td>{ts.Name}</td><td> {ts.Duration}</td> <td><Progress data = {ts.Progress}/></td></tr>{/each} -->
    </table>
    </Tab>
  </TabControl>
  <div class = "project-grid gap-6 p-4">
    {#each projects || [] as data}
      <Project mini = {true} {data} conditions = {{Current:true}}/>
    {/each}
  </div>
</section>

<style>
  .exec-grid {grid-template-columns: 1fr 2fr;}
</style>
