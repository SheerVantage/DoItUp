import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.BHwCLuW1.js","_app/immutable/chunks/scheduler.BRlKLB1Y.js","_app/immutable/chunks/index.B98PtPql.js","_app/immutable/chunks/Project.O-O5NYNx.js"];
export const stylesheets = ["_app/immutable/assets/2.sSLQsJQJ.css","_app/immutable/assets/Project.DlXdewRa.css"];
export const fonts = [];
