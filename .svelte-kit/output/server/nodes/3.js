import * as universal from '../entries/pages/profile/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/profile/+page.js";
export const imports = ["_app/immutable/nodes/3.B517cyY3.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.FV0LB4Q9.js","_app/immutable/chunks/index.-K2F0Nvt.js","_app/immutable/chunks/Header.eN5Q3iBF.js","_app/immutable/chunks/entry.DqgX9c4E.js","_app/immutable/chunks/stores.CEP0RZfM.js"];
export const stylesheets = ["_app/immutable/assets/Header.Bv-JcuRv.css"];
export const fonts = [];
