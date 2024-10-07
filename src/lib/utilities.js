export function nowTS(){
	var date = new Date()
	return date.getTime()
}
export function now(format = 'yyyy-mm-dd H:M:S'){
	var format = format || "H:M";
	var date = new Date();
	var seconds = ("0" + (date.getUTCSeconds())).slice(-2)
	var str = format
		.replace('yyyy', date.getFullYear()).replace('mm', ("0"+(date.getMonth() + 1)).slice(-2)).replace('dd', ("0"+(date.getDay() + 1)).slice(-2))
		.replace('H', ("0"+date.getHours()).slice(-2)).replace('M', ("0"+(date.getUTCMinutes())).slice(-2)).replace('S', ("0" + (date.getUTCSeconds())).slice(-2))
	return str;
}
export function clickoutside(node, param = { enabled: true }) {
	let { enabled, eventType, nodeForEvent, options, capture } = resolveConfig(param);

	/**
	 * @param {Event} event
	 */
	function handle(event) {
		if (!event.target) return;
		if (node && !node.contains(/** @type {Node} */ (event.target)) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside', { detail: event }));
		}
	}

	if (param.enabled !== false) {
		nodeForEvent.addEventListener(eventType, handle, options);
	}

	return {
		update(update) {
			nodeForEvent.removeEventListener(eventType, handle, capture);
			({ enabled, eventType, nodeForEvent, options, capture } = resolveConfig(update));
			if (enabled) nodeForEvent.addEventListener(eventType, handle, options);
		},
		destroy() {
			nodeForEvent.removeEventListener(eventType, handle, capture);
		},
	};
}
export function resolveConfig(param = {}) {
	return {
		enabled: param.enabled ?? true,
		nodeForEvent: param.limit?.parent ?? document,
		eventType: param.event ?? 'click',
		options: param.options,
		capture: typeof param.options === 'object' ? param.options?.capture : param.options,
	};
}
export function nowFull(ts){
	var a = ts ? new Date(ts * 1000) : new Date()
	// var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	// debugger
	var year = a.getFullYear();
	var month = ("0" + ( a.getMonth() + 1 ) ).slice(-2) //months[a.getMonth()];
	var date = ("0" + a.getDate()).slice(-2)
	var hour = ("0" + a.getHours()).slice(-2)
	var min = ("0" + a.getMinutes()).slice(-2)
	var sec = ("0" + a.getSeconds()).slice(-2)
	var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
	return time;
}

export function difference(start, end){
	let diff = (end - start) / 60000 // in munutes
	// debugger
	return diff
}

export function toTime(ts = undefined){
	// debugger
	// return ts ? new Date(ts * 1e3).toISOString().slice(-13, -5) : ''
	return ts ? new Date(ts * 1e3).toLocaleTimeString("en-US") : ''
	return ts ? new Date(ts * 1000).toISOString().slice(0, 19).replace('T', ' ') : ''
}