'use strict';
const request = require('request');
const chalk = require('chalk');
request('http://ufc-data-api.ufc.com/api/v1/us/events', (error, response, body) => {
	if (!error && response.statusCode == 200) {
		let events = eval(body);
		events = events
		.filter(event => {
			let date = new Date(event.event_date);
			return date > new Date()
		})
		.forEach((event,i) => {
			let raw_date = new Date(event.event_date);
			let date = `${raw_date.getUTCMonth()+1}/${raw_date.getUTCDate()}/${raw_date.getUTCFullYear()}`;
			let title = chalk.bold.red(`${event.base_title}${event.title_tag_line ? ': '+event.title_tag_line : ''}`);
			let status = chalk.bold(`${event.event_status} ${event.subtitle}`);
			let date_string = chalk.bold(`${date} ${raw_date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', timeZone:'America/Los_Angeles'})}`);
			let location = `${event.location ? '- '+event.location : ''}`;
			
			console.log(`${i+1}. ${date_string} - ${status} ${title} ${location}`);
			console.log(event.short_description ? event.short_description + '\n' : '');
		})
	}
});