#!/usr/bin/env node
'use strict';
const request = require('request');
const chalk = require('chalk');
const series = require('async-each-series');
request('http://ufc-data-api.ufc.com/api/v3/us/events', (error, response, body) => {
	if (!error && response.statusCode == 200) {
		let events = eval(body);
		events = events.filter(event => {
			let date = new Date(event.event_date);
			return date > new Date()
		})
		.sort((event_a,event_b) => {
			return new Date(event_a.event_date) > new Date(event_b.event_date) ? 1 : 0
		});
		series(events, (event, next) => {
			let raw_date = new Date(event.event_date);
			let date = `${raw_date.getUTCMonth()+1}/${raw_date.getUTCDate()}/${raw_date.getUTCFullYear()}`;
			let title = chalk.bold.red(`${event.base_title}${event.title_tag_line ? ': '+event.title_tag_line : ''}`);
			let status = chalk.bold(`${event.event_status} ${event.subtitle}`);
			let date_string = chalk.bold(`${date} ${raw_date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', timeZone:'America/Los_Angeles'})}`);
			let location = `${event.location ? '- '+event.location : ''}`;
			
			request('http://ufc-data-api.ufc.com/api/v3/us/events/'+event.id+'/fights', (err, resp, bod) => {
				let card = eval(bod);
				console.log(`${events.indexOf(event)+1}. ${date_string} - ${title} ${status} ${location}`);
				console.log(event.short_description ? event.short_description + '\n' : '');
				if (card.length > 0) {
					card.forEach(cardObj => {
						if (!cardObj.fighter1_first_name) {
							return;
						}
						let fighter1 = `${cardObj.fighter1_first_name} ${cardObj.fighter1_last_name} (${cardObj.fighter1record})`;
						let fighter2 = `${cardObj.fighter2_first_name} ${cardObj.fighter2_last_name} (${cardObj.fighter2record})`;
						let bout = `\t${fighter1} ${chalk.red('vs.')} ${fighter2}`;
						console.log(bout);
					});
					console.log();
				} 
				next();
			});
		})
	}
});

/**
 * id: 285771,
  fighter1reach: 78,
  fighter2weight: 238,
  fighter2height: 76,
  fighter2record: '17-4-0',
  fighter2reach: 77,
  event_id: 576335,
  fighter1height: 76,
  fighter1weight: 265,
  fightcard_order: 1,
  statid: 5993,
  fighter1record: '36-9-0',
  is_title_fight: false,
  fighter1_id: 1103,
  fighter2_id: 963,
  is_main_event: true,
  fight_description: null,
  is_prelim: false,
  fighter1odds: null,
  fighter2odds: null,
  fighter1_nickname: null,
  fighter1_wins: 36,
  fighter1_statid: 969,
  fighter1_losses: 9,
  fighter1_last_name: 'Rothwell',
  fighter1_weight_class: 'Heavyweight',
  fighter1_draws: 0,
  fighter1_first_name: 'Ben',
  fighter1_rank: '4',
  fighter2_nickname: 'Cigano',
  fighter2_wins: 17,
  fighter2_statid: 535,
  fighter2_losses: 4,
  fighter2_last_name: 'Dos Santos',
  fighter2_weight_class: 'Heavyweight',
  fighter2_draws: 0,
  fighter2_first_name: 'Junior',
  fighter2_rank: '5',
  fighter1_full_body_image: 'http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252FBen_Rothwell%252FROTHWELL_BEN_L.png?mh530',
  fighter2_full_body_image: 'http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252F%252FJunior_Dos_Santos%252FDOS-SANTOS_JUNIOR_R.png?mh530',
  fighter1_profile_image: 'http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252FBen_Rothwell%252FROTHWELL_BEN.png?mw300-mh300-tc1',
  fighter2_profile_image: 'http://imagec.ufc.com/http%253A%252F%252Fmedia.ufc.tv%252F%252Ffighter_images%252F%252FJunior_Dos_Santos%252FDOS-SANTOS_JUNIOR.png?mw300-mh300-tc1',
  ending_time: '',
  fm_stats_feed_url: 'http://liveapi.fightmetric.com/V2/769/5993/Stats.json',
  fm_fight_rhythm_feed_url: 'http://liveapi.fightmetric.com/V1/769/5993/FightRhythm.json',
  fighter1_averagefighttime: '6:32',
  fighter1_averagefighttime_seconds: '392.0',
  fighter1_kdaverage: '1.02',
  fighter1_slpm: '2.85',
  fighter1_strikingaccuracy: '43.45',
  fighter1_sapm: '3.42',
  fighter1_strikingdefense: '49.75',
  fighter1_takedownaverage: '1.02',
  fighter1_takedownaccuracy: '36.36',
  fighter1_takedowndefense: '69.05',
  fighter1_submissionsaverage: '0.51',
  fighter2_averagefighttime: '11:11',
  fighter2_averagefighttime_seconds: '671.0',
  fighter2_kdaverage: '1.15',
  fighter2_slpm: '4.66',
  fighter2_strikingaccuracy: '46.65',
  fighter2_sapm: '3.25',
  fighter2_strikingdefense: '53.44',
  fighter2_takedownaverage: '0.48',
  fighter2_takedownaccuracy: '62.5',
  fighter2_takedowndefense: '80.49',
  fighter2_submissionsaverage: '0.1',
  fighter1_is_winner: false,
  fighter2_is_winner: false,
  result: 
   { Method: null,
     EndingRound: null,
     EndingTime: '',
     Submission: null,
     EndStrike: null,
     EndTarget: null,
     EndPosition: null,
     EndNotes: null,
     FightOfTheNight: null,
     Scores: [ [Object] ] } }
 */