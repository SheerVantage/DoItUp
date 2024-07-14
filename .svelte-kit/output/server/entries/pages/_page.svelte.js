import { c as create_ssr_component, a as subscribe, b as set_store_value, v as validate_component, d as each } from "../../chunks/ssr.js";
import { g as getList, t as title, H as Header, P as Project, d as db } from "../../chunks/Header.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tasks, $$unsubscribe_tasks;
  let $title, $$unsubscribe_title;
  $$unsubscribe_title = subscribe(title, (value) => $title = value);
  let tasks = getList("tasks", { Current: true });
  $$unsubscribe_tasks = subscribe(tasks, (value) => $tasks = value);
  set_store_value(title, $title = "Current Tasks", $title);
  let projects = [];
  async function loadProjects() {
    let projectIDs = $tasks.filter((item) => item.Current).map((item) => item.Project_ID);
    projects = await db.projects.where("ID").anyOf(projectIDs).toArray();
  }
  {
    if ($tasks) loadProjects();
  }
  $$unsubscribe_tasks();
  $$unsubscribe_title();
  return `${validate_component(Header, "Header").$$render(
    $$result,
    {
      caption: "Do It Up",
      logo: "/favicon.svg"
    },
    {},
    {
      default: () => {
        return `<a class="px-1 ml-auto bg-blue-300" href="./projects" data-svelte-h="svelte-p8kfr9">View All Projects &gt;</a>`;
      }
    }
  )}  <div class="p-6 grid gap-4"> ${each(projects || [], (data) => {
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
  })}  </div>`;
});
export {
  Page as default
};
