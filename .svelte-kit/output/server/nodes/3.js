import * as universal from '../entries/pages/profile/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/profile/+page.js";
export const imports = ["_app/immutable/nodes/3.DkSABgKP.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.C93KaQKa.js","_app/immutable/chunks/index.CHNZYlRI.js","_app/immutable/chunks/Header.DbhA24Mx.js","_app/immutable/chunks/entry.CdBLqTaw.js","_app/immutable/chunks/stores.Ctbm4BWb.js"];
export const stylesheets = ["_app/immutable/assets/Header.NtAPOz5K.css"];
export const fonts = [];
