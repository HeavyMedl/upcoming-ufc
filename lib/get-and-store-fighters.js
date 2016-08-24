import get_json from "lib/get-json";
import util from "lib/utils"

export default (events, base_url) => {
	return "fighters" in localStorage
		? events
		: get_json(`${base_url}/fighters`)
			.then(fighters => {
				console.log(fighters)
				util.setObject('fighters', fighters)
				return events;
			})
}