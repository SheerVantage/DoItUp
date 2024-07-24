import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.DtATbONY.js","_app/immutable/chunks/scheduler.DIsFmcoY.js","_app/immutable/chunks/index.DZVOKNGc.js","_app/immutable/chunks/Header.V1eHklz-.js","_app/immutable/chunks/entry.DE9vGZqf.js","_app/immutable/chunks/stores.CtVznLzK.js"];
export const stylesheets = ["_app/immutable/assets/2.Ce1zARHR.css","_app/immutable/assets/Header.CbKBMOSe.css"];
export const fonts = [];
