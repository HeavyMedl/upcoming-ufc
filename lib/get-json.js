/**
 * This function returns a promise to be resolved
 * after it attempts to fetch json data from a desired url.
 * This function catches its own rejection so that individual
 * calls are isolated.
 * 
 * @param  {[string]} url - the url to fetch the json from
 * @return {[object]} the promise to be resolved
 *  after the XMLHttpRequest has returned
 */
export default (url) => {
	return new Promise((resolve, reject) => {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    try {
		    	var data = JSON.parse(request.responseText);
		    	resolve(data);
		    } catch(e) {
		    	reject(request);
		    }
		  } else {
		  	reject(request);
		  }
		};
		request.onerror = function(e) {
		  reject(request);
		};
		request.send();
	}).catch(reason => {
		/**
		 * Allow Promise.all to resolve even if a particular
		 * get_json call errors out.
		 */
	});
}