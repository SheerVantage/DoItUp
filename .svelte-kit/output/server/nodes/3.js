import * as universal from '../entries/pages/projects/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/projects/+page.js";
export const imports = ["_app/immutable/nodes/3.BpPajg1t.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BRlKLB1Y.js","_app/immutable/chunks/index.B98PtPql.js","_app/immutable/chunks/Project.DwnrKChE.js"];
export const stylesheets = ["_app/immutable/assets/2.C7VvCO32.css","_app/immutable/assets/Project.DlXdewRa.css"];
export const fonts = [];
