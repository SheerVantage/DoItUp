import { c as create_ssr_component } from "../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>   <section class="h-full overflow-auto">${slots.default ? slots.default({}) : ``}</section> </div>`;
});
export {
  Layout as default
};
