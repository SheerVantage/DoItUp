

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Bjhdr_GS.js","_app/immutable/chunks/scheduler.DIsFmcoY.js","_app/immutable/chunks/index.DZVOKNGc.js"];
export const stylesheets = ["_app/immutable/assets/0.C82wNw9B.css"];
export const fonts = [];
