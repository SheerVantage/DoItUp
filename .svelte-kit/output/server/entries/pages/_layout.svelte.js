import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
const css = {
  code: ".app-body{display:grid;grid-template-rows:40px 1fr;height:100%}.add-body > *:nth-child(2){height:100%;overflow:auto}",
  map: '{"version":3,"file":"AppBody.svelte","sources":["AppBody.svelte"],"sourcesContent":["<div class = \\"app-body\\">\\r\\n    <slot />\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    :global(.app-body) {\\r\\n        display: grid; grid-template-rows: 40px 1fr; height: 100%;\\r\\n    }\\r\\n    :global(.add-body > *:nth-child(2)){ height:100%;  overflow: auto;}\\r\\n</style>"],"names":[],"mappings":"AAKY,SAAW,CACf,OAAO,CAAE,IAAI,CAAE,kBAAkB,CAAE,IAAI,CAAC,GAAG,CAAE,MAAM,CAAE,IACzD,CACQ,0BAA2B,CAAE,OAAO,IAAI,CAAG,QAAQ,CAAE,IAAK"}'
};
const AppBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="app-body">${slots.default ? slots.default({}) : ``} </div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `     ${validate_component(AppBody, "AppBody").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}  `;
});
export {
  Layout as default
};
