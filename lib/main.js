import ufc from "lib/ufc-api";
import draw from "lib/draw";

ufc
	.set_route('events')
	.get_json()
		.then(ufc.get_relevant_events)
		.then(ufc.get_event_fights.bind(ufc))
		.then(draw.events.bind(draw))