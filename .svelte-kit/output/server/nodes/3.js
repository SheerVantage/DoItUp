import * as universal from '../entries/pages/projects/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/projects/+page.js";
export const imports = ["_app/immutable/nodes/3.FtqqUFD6.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BRlKLB1Y.js","_app/immutable/chunks/index.B98PtPql.js","_app/immutable/chunks/Project.O-O5NYNx.js"];
export const stylesheets = ["_app/immutable/assets/3.CtbcnW8e.css","_app/immutable/assets/Project.DlXdewRa.css"];
export const fonts = [];
