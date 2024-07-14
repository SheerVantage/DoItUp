import { c as create_ssr_component, b as subscribe, d as each, v as validate_component } from "../../../chunks/ssr.js";
import { g as getList, P as Project, d as db } from "../../../chunks/Project.js";
const css = {
  code: ".grid.svelte-isyv2k.svelte-isyv2k{display:grid;grid-template-columns:repeat( auto-fit, minmax(350px, 1fr))}.pc-1.svelte-isyv2k>.svelte-isyv2k{padding:0.5rem 1rem}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  // import  presistentStore from \\"$libs/presistent-store\\";\\n  import Project from '../../components/Project.svelte'\\n  import Task from \\"../../components/Task.svelte\\";\\n  import { db, getList, backup, restore } from \\"../../lib/db\\";\\n  // import download from 'downloadjs'\\n  import {onMount} from 'svelte'\\n  // import {importDB, exportDB, importInto, peakImportFile} from \\"dexie-export-import\\";\\n\\n  onMount(async ()=>{\\n    await import('dexie-export-import')\\n  })\\n\\n  let projects = getList('projects', '', 'Name') //liveQuery(() => db.projects.toArray())\\n  let tasks = getList('tasks', {Project_ID:undefined}) //liveQuery(() => db.tasks.toArray())\\n  \\n  function removeProject(data){\\n      // debugger\\n      // $projects = $projects.filter(t=>t.ID != data.ID)\\n      db.projects.where('ID').anyOf(data.ID).delete()\\n  }\\n  async function addProject() {\\n      try {\\n          const id = await db.projects.add({ Name: 'Project ' + ($projects.length + 1), Duration: '2.5', tasks:4 });\\n      } catch (error) {\\n          status = \`Failed to add project: \${error}\`;\\n          console.log(error)\\n      }\\n  }\\n  async function addTask() {\\n      try {\\n          // debugger\\n          const id = await db.tasks.add({ Name: 'Test Task' + ($tasks.length + 1), Duration: '2.5', tasks:4 });\\n      } catch (error) {\\n          status = \`Failed to add project: \${error}\`;\\n          console.log(error)\\n      }\\n  }\\n  \\n<\/script>\\n\\n\\n<div class = \\"p-3 flex gap-1 pc-1\\">\\n  <button class = \\"bg-green-200\\" on:click = {addProject}>Create Project</button>\\n  <button class = \\"bg-green-200 ml-auto\\" on:click = {backup}>Backup</button>\\n  <!-- <button class = \\"bg-green-200\\" on:click = {restore}>Restore</button> -->\\n  <input type=\\"file\\" on:change = {restore}>\\n</div>\\n\\n<div class = \\"p-3 grid gap-2\\">{#each $projects || [] as data}\\n    <!-- <span class = \\"flex bg-blue-100 gap-3\\"> -->\\n        <Project {data} {removeProject} />\\n    <!-- </span> -->\\n{/each}</div>\\n\\n  <style>\\n    .grid { display:grid; grid-template-columns:repeat( auto-fit, minmax(350px, 1fr)); }\\n    .pc-1 > * {padding: 0.5rem 1rem;}\\n  </style>"],"names":[],"mappings":"AAwDI,iCAAM,CAAE,QAAQ,IAAI,CAAE,sBAAsB,QAAQ,QAAQ,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAG,CACnF,mBAAK,CAAG,cAAE,CAAC,OAAO,CAAE,MAAM,CAAC,IAAK"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_tasks;
  let $projects, $$unsubscribe_projects;
  let projects = getList("projects", "", "Name");
  $$unsubscribe_projects = subscribe(projects, (value) => $projects = value);
  let tasks = getList("tasks", { Project_ID: void 0 });
  $$unsubscribe_tasks = subscribe(tasks, (value) => value);
  function removeProject(data) {
    db.projects.where("ID").anyOf(data.ID).delete();
  }
  $$result.css.add(css);
  $$unsubscribe_tasks();
  $$unsubscribe_projects();
  return `<div class="p-3 flex gap-1 pc-1 svelte-isyv2k"><button class="bg-green-200 svelte-isyv2k" data-svelte-h="svelte-1u4z6nm">Create Project</button> <button class="bg-green-200 ml-auto svelte-isyv2k" data-svelte-h="svelte-11kucpw">Backup</button>  <input type="file" class="svelte-isyv2k"></div> <div class="p-3 grid gap-2 svelte-isyv2k">${each($projects || [], (data) => {
    return `  ${validate_component(Project, "Project").$$render($$result, { data, removeProject }, {}, {})}  `;
  })}</div>`;
});
export {
  Page as default
};
