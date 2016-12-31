/**
 * This function returns a promise to be resolved
 * after it attempts to fetch json data from a desired url.
 * The returned promise catches its own rejection so
 * that individual calls are isolated.
 *
 * @param  {[string]} url - the url to fetch the json from
 * @return {[object]} the promise to be resolved
 *  after the XMLHttpRequest has returned
 */
export default (url, isThrowError) => {
	return new Promise((resolve, reject) => {
		var request = new XMLHttpRequest();
		request.timeout = 4000;
		request.open('GET', url, true);
		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    try {
		    	var data = JSON.parse(request.responseText);
		    	resolve(data);
		    } catch(e) {
					console.error(e);
		    	resolve([]);
		    }
		  } else {
				console.error('Bad status: '+request.status);
		  	resolve([]);
		  }
		};
		request.onerror = function(e) {
		  console.error(request);
			resolve([]);
		};
		request.ontimeout = function(e) {
			console.error("timeout");
			resolve([]);
		}
		request.send();
	}).catch(reason => {
		console.error(reason);
		/**
		 * Allow Promise.all to resolve even if a particular
		 * get_json call errors out.
		 */
	});
}
