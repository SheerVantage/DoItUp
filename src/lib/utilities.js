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