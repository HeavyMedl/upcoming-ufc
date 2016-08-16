class Draw {
	constructor() {
		this.cache = {};
	}
	events(events_arr) {
		events_arr.forEach((event, index) => {
			console.log(this.tmpl('tmpl_event', {}))
		});
	}
	tmpl(str, data) {
	    let fn = !/\W/.test(str) 
	    	? this.cache[str] = this.cache[str] 
	    		|| this.tmpl(document.getElementById(str).innerHTML) 
	    	: new Function("obj", 
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				"with(obj){p.push('" +
				str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'")
					+ "');}return p.join('');");
	    return data ? fn( data ) : fn;
	}
}
export default new Draw()