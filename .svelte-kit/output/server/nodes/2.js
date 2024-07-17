import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.Dz1geff9.js","_app/immutable/chunks/scheduler.FV0LB4Q9.js","_app/immutable/chunks/index.-K2F0Nvt.js","_app/immutable/chunks/Header.eN5Q3iBF.js","_app/immutable/chunks/entry.DqgX9c4E.js","_app/immutable/chunks/stores.CEP0RZfM.js"];
export const stylesheets = ["_app/immutable/assets/2.DeYo0J_T.css","_app/immutable/assets/Header.Bv-JcuRv.css"];
export const fonts = [];
