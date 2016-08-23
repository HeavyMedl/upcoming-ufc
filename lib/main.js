import UFC from "lib/ufc-api";
import future_events from "lib/future-events";
import draw from "lib/draw";

UFC.get_events()
	.then(future_events)
	.then(UFC.get_event_fights.bind(UFC))
	.then(draw.initialize.bind(draw))

UFC.get_fighters()
	.then(data => {
		console.log(data);
	})