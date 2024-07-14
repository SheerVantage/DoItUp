<script>
  import Project from '../components/Project.svelte'
	import Header  from '../components/Header.svelte'
  import { db, getList } from "../lib/db";
  import { title } from "../lib/store";

  let tasks = getList('tasks', {Current:true})
  $: if($tasks) loadProjects()
  $title = 'Current Tasks'
  let projects = []
  async function loadProjects(){
    let projectIDs = $tasks.filter(item => item.Current).map(item=>item.Project_ID);
    projects = await db.projects.where('ID').anyOf(projectIDs).toArray()
  }

</script>

<Header caption = "" logo = {"/favicon.svg"} >
  <a class = "px-1 ml-auto bg-blue-300" href = "./projects">All Projects ></a>
</Header>
<!-- <div class = "w-full flex p-2 bg-gray-300"><span>DoItUp:</span><a class = "px-1 ml-auto bg-blue-300" href = "./projects">View All Projects ></a></div> -->
<div class = "p-6 grid gap-4">
    <!-- <span class = "flex gap-6 p-4"> -->
    {#each projects || [] as data}
      <Project mini = {true} {data} conditions = {{Current:true}}/>
    {/each}
    <!-- </span> -->
</div>

<style>
</style>
