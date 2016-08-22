import util from "lib/utils";
class Draw {
	events(events_arr) {
		events_arr.forEach((event, index) => {
			console.log(event)
			document
				.getElementById('events-container')
				.insertAdjacentHTML('beforeend',
					util.tmpl('tmpl_event', {
						base_title : event.base_title || '',
						title_tag_line : event.title_tag_line || '',
						subtitle : event.subtitle || '',
						status : event.event_status || '',
						date : util.get_formatted_date(event.event_date),
						time : `${event.event_time_text} ${event.event_time_zone_text}`,
						img_src : event.feature_image || event.secondary_feature_image,
						arena : event.arena,
						location : event.location ? 'in '+event.location : ''
						// trailer_url : event.trailer_url || ''
					})
				)
		});
		this.feature_images();
		this.loader();
	}
	feature_images() {
		util.class_iterate('feature-img-container', element => {
			element.style.backgroundImage = `url('${element.dataset.src}')`;
		})
	}
	loader() {
		document.getElementById('loader').className = 'hide';
		document.getElementById('events-container').className = 'row center-xs';
	}
}
export default new Draw()