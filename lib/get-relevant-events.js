/**
 * Returns an array of objects representing only upcoming
 * events that have been sorted by date.
 * @param  {[array]} events - the raw array of objects
 * 	from the events api call
 * @return {[array]} events - the filtered and sorted
 * 	events
 */
export default (events) => {
	return events
		.filter(event => {
			let date = new Date(event.event_date);
			return date > new Date()
		})
		.sort((event_a,event_b) => {
			event_a = new Date(event_a.event_date)
			event_b = new Date(event_b.event_date) 
			return event_a > event_b ? 1 : 0
		});
}