import { c as create_ssr_component, e as escape, a as subscribe, b as each, v as validate_component, s as setContext, d as set_store_value, f as add_attribute, g as getContext } from "../../chunks/ssr.js";
import { t as task, g as getList, a as title, H as Header, P as Project, d as db } from "../../chunks/Header.js";
import { w as writable } from "../../chunks/index.js";
const Session = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div> ${escape(data.DateTime_Start || "Start")} ${escape(data.DateTime_End || "End")} ${escape(data.Duration || "Duration")} ${escape(data.Progress || "Progress")} </div>`;
});
const TaskExecution = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $task, $$unsubscribe_task;
  let $sessions, $$unsubscribe_sessions;
  $$unsubscribe_task = subscribe(task, (value) => $task = value);
  let sessions = getList("sessions", {
    Task_ID: $task.ID,
    DateTime_End: void 0
  });
  $$unsubscribe_sessions = subscribe(sessions, (value) => $sessions = value);
  {
    if ($task.ID & $sessions) {
      $sessions[$sessions.length - 1];
    }
  }
  $$unsubscribe_task();
  $$unsubscribe_sessions();
  return `<div class="p-3 bg-pink-300">${escape($task?.Name)} <div class="flex gap-2"><button data-svelte-h="svelte-1k1uw82">Start</button>  <button data-svelte-h="svelte-znk5wu">End</button> <button class="ml-auto" data-svelte-h="svelte-1ifg2x5">Close</button></div> <ul class="ml-3s w-full flex flex-col bg-green-200">${each($sessions || [], (session) => {
    return `<li>${validate_component(Session, "Session").$$render($$result, { data: session }, {}, {})} </li>`;
  })}</ul></div>`;
});
const localStore = (key, initial) => {
  let saved = "";
  const { subscribe: subscribe2, set, update } = writable(saved);
  return {
    subscribe: subscribe2,
    // getItem:(key) => {
    //     debugger
    //     return localStorage.getItem(key)
    // },
    set: (value) => {
      return set(value);
    },
    update
  };
};
const css$2 = {
  code: ".tab-control.svelte-1010h1x{min-height:100%}.tabs.svelte-1010h1x{padding-left:1rem;border-bottom:1px solid silver;display:flex;gap:1rem;height:40px}.tab-content.svelte-1010h1x{width:100%;height:calc(100% - 40px);padding:0.5rem}",
  map: `{"version":3,"file":"TabControl.svelte","sources":["TabControl.svelte"],"sourcesContent":["\\r\\n<div fill class=\\"tab-control {classes}\\" {name}>\\r\\n\\t<div class=\\"tabs\\">\\r\\n\\t\\t<slot isTitle={true} isContent={false}/>\\r\\n\\t</div>\\r\\n\\t<div class=\\"tab-content\\">\\r\\n\\t\\t<slot isTitle={false} isContent={true}/>\\r\\n\\t</div>\\r\\n</div>\\r\\n<!-- <TabControl name = \\"main\\" let:isTitle let:isContent >\\r\\n\\t<Tab label = \\"Project\\" {isTitle} {isContent}>\\r\\n\\t\\t<Lister size = \\"20\\" bind:items = {$migrationStore.projects} bind:selection = {$migrationStore.projectName} />\\r\\n\\t</Tab>\\r\\n</TabControl> -->\\r\\n\\r\\n<script context=\\"module\\">\\r\\n\\texport const tabsKey = {}\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n\\timport { setContext, onMount } from 'svelte'\\r\\n\\timport { writable } from 'svelte/store'\\r\\n\\timport { localStore } from '../lib/localStore'\\r\\n\\texport let name, screen = '', pid = '', classes\\r\\n\\t\\r\\n\\tconst tabs = writable([]);\\r\\n\\tconst selectedTab = localStore(screen + pid + name + 'selectedTab', null)\\r\\n\\t\\r\\n\\tsetContext(tabsKey, { tabs, selectedTab });\\r\\n\\t\\r\\n\\t// onMount(() => {\\r\\n\\t\\t\\tif ($tabs.length > 0)\\r\\n\\t\\t\\t\\t$selectedTab = $selectedTab || $tabs[0];\\r\\n\\t// });\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n\\t.tab-control { min-height:100%;  }\\r\\n\\t.tabs {padding-left:1rem; border-bottom: 1px solid silver; display: flex; gap:1rem; height:40px;}\\r\\n\\t.tab-content { width: 100%; height: calc(100% - 40px); padding: 0.5rem;}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAqCC,2BAAa,CAAE,WAAW,IAAO,CACjC,oBAAM,CAAC,aAAa,IAAI,CAAE,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,MAAM,CAAE,OAAO,CAAE,IAAI,CAAE,IAAI,IAAI,CAAE,OAAO,IAAK,CAChG,2BAAa,CAAE,KAAK,CAAE,IAAI,CAAE,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CAAE,OAAO,CAAE,MAAO"}`
};
const tabsKey = {};
const TabControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tabs, $$unsubscribe_tabs;
  let $selectedTab, $$unsubscribe_selectedTab;
  let { name, screen = "", pid = "", classes } = $$props;
  const tabs = writable([]);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  const selectedTab = localStore();
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  setContext(tabsKey, { tabs, selectedTab });
  if ($tabs.length > 0) set_store_value(selectedTab, $selectedTab = $selectedTab || $tabs[0], $selectedTab);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.screen === void 0 && $$bindings.screen && screen !== void 0) $$bindings.screen(screen);
  if ($$props.pid === void 0 && $$bindings.pid && pid !== void 0) $$bindings.pid(pid);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0) $$bindings.classes(classes);
  $$result.css.add(css$2);
  $$unsubscribe_tabs();
  $$unsubscribe_selectedTab();
  return `<div fill class="${"tab-control " + escape(classes, true) + " svelte-1010h1x"}"${add_attribute("name", name, 0)}><div class="tabs svelte-1010h1x">${slots.default ? slots.default({ isTitle: true, isContent: false }) : ``}</div> <div class="tab-content svelte-1010h1x">${slots.default ? slots.default({ isTitle: false, isContent: true }) : ``}</div></div> `;
});
const css$1 = {
  code: ".tab-container.svelte-1khabnm{display:block;height:100%;overflow:auto}.tab-button.svelte-1khabnm{display:flex;place-items:center;padding-inline:0.5rem}.tab-button.selected.svelte-1khabnm{background:whitesmoke;border:1px solid lightgray;border-bottom-width:0px;cursor:default}",
  map: `{"version":3,"file":"Tab.svelte","sources":["Tab.svelte"],"sourcesContent":["<script>\\r\\n\\timport { tabsKey } from './TabControl.svelte';\\r\\n\\timport { getContext, onMount } from 'svelte';\\r\\n\\timport {fade} from 'svelte/transition'\\r\\n\\r\\n\\t// export let classes //id, ;\\r\\n\\texport let isTitle;\\r\\n\\texport let isContent;\\r\\n\\texport let label = 'New tab'\\r\\n\\t\\r\\n\\tconst { selectedTab, tabs } = getContext(tabsKey);\\r\\n\\t$tabs = $tabs.some(t => t == label) ? $tabs : [...$tabs, label];\\r\\n\\t\\r\\n\\t// $: isSelected = label == $selectedTab;\\r\\n<\/script>\\r\\n{#if isTitle}\\r\\n\\t<button class=\\"tab-button\\" class:selected={label == $selectedTab} on:click={() => $selectedTab = label}>\\r\\n\\t\\t{label} <!-- <slot name=\\"title\\"/> -->\\r\\n\\t</button>\\r\\n{/if}\\r\\n\\r\\n{#if isContent && label == $selectedTab}\\r\\n\\t<div transition:fade class = \\"tab-container\\" fill><slot/></div>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n\\t.tab-container {display: block; height: 100%; overflow:auto;}\\r\\n\\t.tab-button {display: flex; place-items: center; padding-inline: 0.5rem;}\\r\\n\\t/* .tab { height:100%; border: none; padding: 0 8px; cursor: pointer; background: none; margin: 0; cursor: pointer; border-bottom-left-radius: 0; border-bottom-right-radius: 0; } */\\r\\n\\t.tab-button.selected { background: whitesmoke; border: 1px solid lightgray; border-bottom-width: 0px; cursor: default; }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA0BC,6BAAe,CAAC,OAAO,CAAE,KAAK,CAAE,MAAM,CAAE,IAAI,CAAE,SAAS,IAAK,CAC5D,0BAAY,CAAC,OAAO,CAAE,IAAI,CAAE,WAAW,CAAE,MAAM,CAAE,cAAc,CAAE,MAAO,CAExE,WAAW,wBAAU,CAAE,UAAU,CAAE,UAAU,CAAE,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,SAAS,CAAE,mBAAmB,CAAE,GAAG,CAAE,MAAM,CAAE,OAAS"}`
};
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tabs, $$unsubscribe_tabs;
  let $selectedTab, $$unsubscribe_selectedTab;
  let { isTitle } = $$props;
  let { isContent } = $$props;
  let { label = "New tab" } = $$props;
  const { selectedTab, tabs } = getContext(tabsKey);
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  set_store_value(tabs, $tabs = $tabs.some((t) => t == label) ? $tabs : [...$tabs, label], $tabs);
  if ($$props.isTitle === void 0 && $$bindings.isTitle && isTitle !== void 0) $$bindings.isTitle(isTitle);
  if ($$props.isContent === void 0 && $$bindings.isContent && isContent !== void 0) $$bindings.isContent(isContent);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  $$result.css.add(css$1);
  $$unsubscribe_tabs();
  $$unsubscribe_selectedTab();
  return `${isTitle ? `<button class="${["tab-button svelte-1khabnm", label == $selectedTab ? "selected" : ""].join(" ").trim()}">${escape(label)} </button>` : ``} ${isContent && label == $selectedTab ? `<div class="tab-container svelte-1khabnm" fill>${slots.default ? slots.default({}) : ``}</div>` : ``}`;
});
const css = {
  code: ".exec-grid.svelte-nw5sn6{grid-template-columns:1fr 2fr}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import Project from '../components/Project.svelte'\\n  import TaskExecution from '../components/TaskExecution.svelte'\\n\\timport Header  from '../components/Header.svelte'\\n\\timport Tab  from '../components/Tab.svelte'\\n\\timport TabControl  from '../components/TabControl.svelte'\\n  import { db, getList } from \\"../lib/db\\";\\n  import { title, task } from \\"../lib/store\\";\\n\\n  let tasks = getList('tasks', {Current:true})\\n  $: if($tasks) loadProjects()\\n  $title = 'Current Tasks'\\n  let projects = [], sessions = []\\n  async function loadProjects(){\\n    let projectIDs = $tasks.filter(item => item.Current).map(item=>item.Project_ID);\\n    projects = await db.projects.where('ID').anyOf(projectIDs).toArray()\\n\\n  }\\n\\n<\/script>\\n\\n<Header caption = \\"\\" logo = {\\"/favicon.svg\\"} >\\n  <a class = \\"px-2 rounded ml-auto bg-blue-300 \\" href = \\"./projects\\">All Projects</a>\\n</Header>\\n<!-- <div class = \\"w-full flex p-2 bg-gray-300\\"><span>DoItUp:</span><a class = \\"px-1 ml-auto bg-blue-300\\" href = \\"./projects\\">View All Projects ></a></div> -->\\n<section class:exec-grid = {$task} class = \\"overflow p-3 md:p-6 grid gap-2 md:gap-4\\">\\n  <TabControl name = \\"main\\" let:isTitle let:isContent >\\n    <Tab label = \\"Now\\" {isTitle} {isContent}>\\n    {#if $task}<TaskExecution />{/if}\\n    </Tab>\\n    <Tab label = \\"Today\\" {isTitle} {isContent}>\\n      <table>\\n        <tr><td>Name</td><td>Duration</td><td>Progress</td></tr>\\n        <!-- {#each tasks_sessions as ts}<tr><td>{ts.Name}</td><td> {ts.Duration}</td> <td>{ts.Progress}</td></tr>{/each} -->\\n    </table>\\n    </Tab>\\n  </TabControl>\\n  <div class = \\"project-grid gap-6 p-4\\">\\n    {#each projects || [] as data}\\n      <Project mini = {true} {data} conditions = {{Current:true}}/>\\n    {/each}\\n  </div>\\n</section>\\n\\n<style>\\n  .exec-grid {grid-template-columns: 1fr 2fr;}\\n</style>\\n"],"names":[],"mappings":"AA6CE,wBAAW,CAAC,qBAAqB,CAAE,GAAG,CAAC,GAAI"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tasks, $$unsubscribe_tasks;
  let $title, $$unsubscribe_title;
  let $task, $$unsubscribe_task;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  $$unsubscribe_task = subscribe(task, (value) => $task = value);
  let tasks = getList("tasks", { Current: true });
  $$unsubscribe_tasks = subscribe(tasks, (value) => $tasks = value);
  set_store_value(title, $title = "Current Tasks", $title);
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
  $$unsubscribe_title();
  $$unsubscribe_task();
  return `${validate_component(Header, "Header").$$render($$result, { caption: "", logo: "/favicon.svg" }, {}, {
    default: () => {
      return `<a class="px-2 rounded ml-auto bg-blue-300 " href="./projects" data-svelte-h="svelte-9f00o4">All Projects</a>`;
    }
  })}  <section class="${[
    "overflow p-3 md:p-6 grid gap-2 md:gap-4 svelte-nw5sn6",
    $task ? "exec-grid" : ""
  ].join(" ").trim()}">${validate_component(TabControl, "TabControl").$$render($$result, { name: "main" }, {}, {
    default: ({ isTitle, isContent }) => {
      return `${validate_component(Tab, "Tab").$$render($$result, { label: "Now", isTitle, isContent }, {}, {
        default: () => {
          return `${$task ? `${validate_component(TaskExecution, "TaskExecution").$$render($$result, {}, {}, {})}` : ``}`;
        }
      })} ${validate_component(Tab, "Tab").$$render($$result, { label: "Today", isTitle, isContent }, {}, {
        default: () => {
          return `<table data-svelte-h="svelte-ojbtq7"><tr><td>Name</td><td>Duration</td><td>Progress</td></tr> </table>`;
        }
      })}`;
    }
  })} <div class="project-grid gap-6 p-4">${each(projects || [], (data) => {
    return `${validate_component(Project, "Project").$$render(
      $$result,
      {
        mini: true,
        data,
        conditions: { Current: true }
      },
      {},
      {}
    )}`;
  })}</div> </section>`;
});
export {
  Page as default
};
