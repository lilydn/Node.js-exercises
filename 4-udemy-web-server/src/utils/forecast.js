const request = require('request');

const forcast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=977a03da7c44053e0e23df0bdb718701&query=' +
		latitude +
		',' +
		longitude +
		'&units=m';

	request({ url: url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!');
		} else if (body.error) {
			callback('Unable to find location. Try another search!', undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					'. Its currently ' +
					body.current.temperature +
					' degrees out. It fells like ' +
					body.current.feelslike +
					' degrees out.'
			);
		}
	});
};

module.exports = forcast;
