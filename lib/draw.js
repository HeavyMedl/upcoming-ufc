import util from "lib/utils";

class Draw {
	constructor(args) {
		this.fighters = []
	}
	initialize(events_arr) {
		this.fighters = util.getObject('fighters') || []
		this.build_templates(events_arr);
		this.load_feature_images();
		this.toggle_loader();
	}
	build_templates(events_arr) {
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
						location : event.location ? 'in '+event.location : '',
						panels : this.get_panels(event.fights)
					})
				)
		});
	}
	get_panels(fights) {
		let panel_html = "";
		fights = fights || [];
		fights.forEach((f, index) => {
			let fighter1 = util.get_fighter_object(f.fighter1_id, this.fighters),
				fighter2 = util.get_fighter_object(f.fighter2_id, this.fighters);
			panel_html += util.tmpl('tmpl_fight', {
				fighter_1 : `${f.fighter1_first_name || fighter1.first_name || '???'} ${f.fighter1_last_name || fighter1.last_name || '???'}`,
				fighter_2 : `${f.fighter2_first_name || fighter2.first_name || '???'} ${f.fighter2_last_name || fighter2.last_name || '???'}`
			})
		});
		return panel_html;
	}
	load_feature_images() {
		util.class_iterate('feature-img-container', element => {
			element.style.backgroundImage = `url('${element.dataset.src}')`;
		})
	}
	toggle_loader() {
		document.getElementById('loader').className = 'hide';
		document.getElementById('events-container').className = 'row center-xs';
	}
}
export default new Draw()