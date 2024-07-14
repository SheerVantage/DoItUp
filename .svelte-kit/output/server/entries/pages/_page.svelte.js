import { c as create_ssr_component, b as subscribe, d as each, v as validate_component } from "../../chunks/ssr.js";
import { g as getList, P as Project, d as db } from "../../chunks/Project.js";
const css = {
  code: ".grid.svelte-1kbnvm6{display:grid;grid-template-columns:repeat( auto-fit, minmax(350px, 1fr))}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import Project from '../components/Project.svelte'\\n  import { db, getList } from \\"../lib/db\\";\\n\\n  let tasks = getList('tasks', {Current:true})\\n  $: if($tasks) loadProjects()\\n\\n  let projects = []\\n  async function loadProjects(){\\n    let projectIDs = $tasks.filter(item => item.Current).map(item=>item.Project_ID);\\n    projects = await db.projects.where('ID').anyOf(projectIDs).toArray()\\n  }\\n\\n<\/script>\\n\\n<div class = \\"p-6 grid gap-4\\">\\n    <!-- <span class = \\"flex gap-6 p-4\\"> -->\\n    {#each projects || [] as data}\\n      <Project mini = {false} {data} conditions = {{Current:true}}/>\\n    {/each}\\n    <!-- </span> -->\\n</div>\\n\\n<style>\\n  .grid { display:grid; grid-template-columns:repeat( auto-fit, minmax(350px, 1fr)); }\\n  /* .pc-1 > * {padding: 0.5rem 1rem;} */\\n</style>\\n"],"names":[],"mappings":"AAwBE,oBAAM,CAAE,QAAQ,IAAI,CAAE,sBAAsB,QAAQ,QAAQ,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAG"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tasks, $$unsubscribe_tasks;
  let tasks = getList("tasks", { Current: true });
  $$unsubscribe_tasks = subscribe(tasks, (value) => $tasks = value);
  let projects = [];
  async function loadProjects() {
    let projectIDs = $tasks.filter((item) => item.Current).map((item) => item.Project_ID);
    projects = await db.projects.where("ID").anyOf(projectIDs).toArray();
  }
  $$result.css.add(css);
  {
    if ($tasks) loadProjects();
  }
  $$unsubscribe_tasks();
  return `<div class="p-6 grid gap-4 svelte-1kbnvm6"> ${each(projects || [], (data) => {
    return `${validate_component(Project, "Project").$$render(
      $$result,
      {
        mini: false,
        data,
        conditions: { Current: true }
      },
      {},
      {}
    )}`;
  })}  </div>`;
});
export {
  Page as default
};
