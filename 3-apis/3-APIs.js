const request = require('request');
const https = require('https');
const axios = require('axios');

const baseURL = 'https://swapi.dev/api/';

//First task - fetch using request module
const getUsingRequest = (baseURL, callback) => {
	const url = baseURL + 'people/';

	request({ url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to data', undefined);
		} else if (!response.body.results || response.body.results.length === 0) {
			callback('Unable to find the requested data.', undefined);
		} else {
			const people = response.body.results.map(person => {
				return {
					name: person.name,
					gender: person.gender,
				};
			});
			callback(undefined, people);
		}
	});
};

//Second task - fetch using https module
const getUsingHttps = (baseURL, callback) => {
	const url = baseURL + 'starships/';
	const request = https.request(url, response => {
		let data = '';
		response.on('data', chunk => {
			data = data + chunk.toString();
		});
		response.on('end', () => {
			const body = JSON.parse(data);
			if (!body.results || body.results.length === 0) {
				callback('Unable to find the requested data', undefined);
			} else {
				const starships = body.results.map(starship => {
					return {
						name: starship.name,
						model: starship.model,
						class: starship.starship_class,
						crew: starship.crew,
					};
				});
				callback(undefined, starships);
			}
		});
	});
	request.on('error', error => {
		callback(error, undefined);
	});
	request.end();
};

// ------------------------ //

getUsingRequest(baseURL, (error, data) => {
	error ? console.log(error) : console.log(data);
});

getUsingHttps(baseURL, (error, data) => {
	error ? console.log(error) : console.log(data);
});
