export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".htaccess","configs.json","favicon.png","favicon.svg","icon.svg","icon192.png","icon512.png","manifest.json","screenshot-desktop-2.jpg","service-worker.js"]),
	mimeTypes: {".json":"application/json",".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.M9j8yFOG.js","app":"_app/immutable/entry/app.DGpxCfbX.js","imports":["_app/immutable/entry/start.M9j8yFOG.js","_app/immutable/chunks/entry.DqgX9c4E.js","_app/immutable/chunks/scheduler.FV0LB4Q9.js","_app/immutable/entry/app.DGpxCfbX.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.FV0LB4Q9.js","_app/immutable/chunks/index.-K2F0Nvt.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
