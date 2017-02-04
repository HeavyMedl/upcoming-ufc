import get_json from "lib/get-json";
import util from "lib/utils"
export default (events, base_url) => {
  let hasFighters = "fighters" in localStorage && JSON.parse(localStorage.fighters)
    .length > 0
  return hasFighters ? events : get_json(`${base_url}/fighters`)
    .then(fighters => {
      console.log(`Got fighters from ${base_url}/fighters`)
      util.setObject('fighters', fighters)
      return events;
    })
}
