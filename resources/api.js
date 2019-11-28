import moment from 'moment';
import axios from 'axios';
import uuid from 'uuid';

const url = `https://application-mock-server.localtunnel.me/events`;

export async function getEvents() {
	try {
		const res = await axios.get(url);

		const data = res.data;

		if (data.length) return data.map((evt) => ({ ...evt, date: new Date(evt.date) }));
		else return data;
	} catch (error) {
		console.error(error);
	}
}

export function sendEvent(title = '', date = '') {
	fetch(url, {
		method  : 'POST',
		body    : JSON.stringify({
			title,
			date,
			id    : uuid()
		}),
		headers : new Headers({
			'Content-Type' : 'application/json'
		})
	}).then((res) => res.json());
	// .catch((err) => console.error(err));
	// try {
	// 	const config = {
	// 		headers : {
	// 			'Content-Type' : 'application/json'
	// 		}
	// 	};
	// 	const id = uuid();
	// 	const res = await axios.post(url, { title, date, id }, config);
	// 	return res.data;
	// } catch (error) {
	// 	console.error(error);
	// }
}

export function formatDate(dateString) {
	const parsed = moment(new Date(dateString));

	if (!parsed.isValid()) {
		return dateString;
	}

	return parsed.format('D MMM YYYY');
}

export function formatDateTime(dateString) {
	const parsed = moment(new Date(dateString));

	if (!parsed.isValid()) {
		return dateString;
	}

	return parsed.format('H A on D MMM YYYY');
}

export function getCountdownParts(eventDate) {
	const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
	return {
		days    : parseInt(duration.as('days')),
		hours   : duration.get('hours'),
		minutes : duration.get('minutes'),
		seconds : duration.get('seconds')
	};
}
