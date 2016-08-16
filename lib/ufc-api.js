import get_json from "lib/get-json";
import get_relevant_events from "lib/get-relevant-events";
import get_event_fights from "lib/get-event-fights";

class UFC {
	constructor() {
		this.base_url = 'https://crossorigin.me/http://ufc-data-api.ufc.com/api/v3/us';
		this.url = this.base_url;
	}
	set_route(route) {
		this.url = this.base_url + '/' + route;
		return this;
	}
	get_json() {
		return get_json(this.url);
	}
	get_relevant_events(events) {
		return get_relevant_events(events);
	}
	get_event_fights(events) {
		return get_event_fights(events, this.url);
	}
}
export default new UFC();