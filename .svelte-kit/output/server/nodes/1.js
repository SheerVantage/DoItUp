

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.GGHEJOiZ.js","_app/immutable/chunks/scheduler.BRlKLB1Y.js","_app/immutable/chunks/index.B98PtPql.js","_app/immutable/chunks/entry.C0_QmRMd.js"];
export const stylesheets = [];
export const fonts = [];
