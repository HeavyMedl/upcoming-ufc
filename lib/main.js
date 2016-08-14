import ufc from "lib/ufc-api";

ufc
	.set_route('events')
	.get_json()
		.then(ufc.get_relevant_events)
		.then(ufc.get_event_fights.bind(ufc))
		.then(data => {
			console.log(data)
		})