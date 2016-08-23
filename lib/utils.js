class Utils {
	constructor(args) {
		this.cache = {};
		this.month_names = [
			"January", "February", "March", "April", "May", "June", 
			"July", "August", "September", "October", "November", "December"
		];
	}
	/**
	 * Jon Resig's templating function
	 * @param  {[type]} str  [description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
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
	get_formatted_date(dateString) {
		let raw_date = new Date(dateString),
			date = new Date(
				raw_date.getUTCFullYear(), 
				raw_date.getUTCMonth(), 
				raw_date.getUTCDate());
		return date.toLocaleDateString("en-US", {
			weekday: "long", month: "long", day: "numeric"
		})
	}
	class_iterate(className, fn) {
		let node_list = document.getElementsByClassName(className);
		for (var i = node_list.length - 1; i >= 0; i--) {
			fn(node_list[i]);
		}
	}
}
export default new Utils()