<script>
  import Project from '../components/Project.svelte'
  import { db, getList } from "../lib/db";

  let tasks = getList('tasks', {Current:true})
  $: if($tasks) loadProjects()

  let projects = []
  async function loadProjects(){
    let projectIDs = $tasks.filter(item => item.Current).map(item=>item.Project_ID);
    projects = await db.projects.where('ID').anyOf(projectIDs).toArray()
  }

</script>

<div class = "p-6 grid gap-4">
    <!-- <span class = "flex gap-6 p-4"> -->
    {#each projects || [] as data}
      <Project mini = {false} {data} conditions = {{Current:true}}/>
    {/each}
    <!-- </span> -->
</div>

<style>
  .grid { display:grid; grid-template-columns:repeat( auto-fit, minmax(350px, 1fr)); }
  /* .pc-1 > * {padding: 0.5rem 1rem;} */
</style>
