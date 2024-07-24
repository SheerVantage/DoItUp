import * as universal from '../entries/pages/profile/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/profile/+page.js";
export const imports = ["_app/immutable/nodes/3.DRyfvGgy.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.DIsFmcoY.js","_app/immutable/chunks/index.DZVOKNGc.js","_app/immutable/chunks/Header.V1eHklz-.js","_app/immutable/chunks/entry.DE9vGZqf.js","_app/immutable/chunks/stores.CtVznLzK.js"];
export const stylesheets = ["_app/immutable/assets/Header.CbKBMOSe.css"];
export const fonts = [];
