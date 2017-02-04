import get_json from "lib/get-json";
/**
 * Using each event id from the passed events objects array,
 * attaches the 'fight card' data from
 * 'events/:eventid/fights' to each event object as part of an
 * ordered promise (Promise.all([event_1, event_2, ...n]))
 * that is ready to be displayed to the user.
 *
 * @param  {[array]} events - the array of event objects
 * 	from the preceeding api call
 * @param  {[string]} base_url - the base UFC API endpoint
 * @return {[object]} the promise containing ordered results
 *  that now include 'fight card' data.
 */
export default (events, base_url) => {
  let promises = [];
  events.forEach((event, i) => {
    let route = `/events/${event.id}/fights`;
    promises.push(get_json(base_url + route)
      .then(data => {
        event.fights = data;
        return event;
      }));
  });
  return Promise.all(promises);
}
