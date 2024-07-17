import { c as create_ssr_component, a as subscribe, v as validate_component, b as each } from "../../../chunks/ssr.js";
import { g as getList, a as title, H as Header, P as Project, d as db } from "../../../chunks/Header.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_tasks;
  let $projects, $$unsubscribe_projects;
  let $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => value);
  let projects = getList("projects", "", "Name");
  $$unsubscribe_projects = subscribe(projects, (value) => $projects = value);
  let tasks = getList("tasks", { Project_ID: void 0 });
  $$unsubscribe_tasks = subscribe(tasks, (value) => value);
  function removeProject(data) {
    db.projects.where("ID").anyOf(data.ID).delete();
  }
  $$unsubscribe_tasks();
  $$unsubscribe_projects();
  $$unsubscribe_title();
  return ` ${validate_component(Header, "Header").$$render(
    $$result,
    {
      caption: "",
      logo: "/favicon.svg",
      bgColor: "bg-blue-200"
    },
    {},
    {
      drawer: () => {
        return `<button class="bg-blue-200 px-2 ml-auto" data-svelte-h="svelte-1g67uw6">Backup</button>  <span class="flex items-center mr-2 relative cursor-pointer bg-green-500 px-2">Restore<input class="absolute cursor-pointer" style="left:0; top:0; z-index:2; opacity:0; width:100%; height:100%;" type="file"></span> `;
      },
      tools: () => {
        return `<button class="bg-green-300 px-2" data-svelte-h="svelte-1ilwja7">Create</button>`;
      }
    }
  )} <section class="overflow p-3 project-grid gap-2 h-full">${each($projects || [], (data) => {
    return ` ${validate_component(Project, "Project").$$render($$result, { data, removeProject }, {}, {})} `;
  })}</section> `;
});
export {
  Page as default
};
