import UFC from "lib/ufc-api";
import filter_future_events from "lib/filter-future-events";
import draw from "lib/draw";

UFC.get_events()
	.then(filter_future_events)
	.then(UFC.get_and_store_fighters.bind(UFC))
	.then(UFC.get_event_fights.bind(UFC))
	.then(draw.initialize.bind(draw))
	.catch(error => {
		console.error(error);
	});
