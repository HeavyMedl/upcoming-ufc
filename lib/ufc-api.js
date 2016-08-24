import get_json from "lib/get-json";
import get_event_fights from "lib/get-event-fights";
import get_and_store_fighters from "lib/get-and-store-fighters";

class UFC {
	/**
	 * Constructor that sets the base_url to the
	 * UFC API endpoint.
	 * @return {[void]}
	 */
	constructor() {
		this.base_url = [
			'https://crossorigin.me/',
			'http://ufc-data-api.ufc.com/api/v3/us'
		].join('');
	}
	/**
	 * GET /api/v3/us/fighters
	 * @return {[array]} The array of fighter objects
	 */
	get_fighters() {
		return get_json(`${this.base_url}/fighters`);
	}
	/**
	 * GET /api/v3/us/events
	 * @return {[array]} The array of event objects
	 */
	get_events() {
		return get_json(`${this.base_url}/events`);
	}
	/**
	 * GET /api/v3/us/events/:event_id/fights
	 * @param  {[array]} events The array of event objects
	 *  whose ids are used to fetch the fights of each event
	 * @return {[array]} The array of event objects with 
	 *  'fights' attached.        	
	 */
	get_event_fights(events) {
		return get_event_fights(events, this.base_url);
	}

	get_and_store_fighters(events) {
		return get_and_store_fighters(events, this.base_url);
	}
}
export default new UFC();