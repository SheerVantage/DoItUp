import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.CVseZMx_.js","_app/immutable/chunks/scheduler.C93KaQKa.js","_app/immutable/chunks/index.CHNZYlRI.js","_app/immutable/chunks/Header.DbhA24Mx.js","_app/immutable/chunks/entry.CdBLqTaw.js","_app/immutable/chunks/stores.Ctbm4BWb.js"];
export const stylesheets = ["_app/immutable/assets/Header.NtAPOz5K.css"];
export const fonts = [];
