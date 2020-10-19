const request = require('request');

const geocode = (address, callback) => {
	const geocodeURL =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoibXluYW1lMTExIiwiYSI6ImNrZ2Zzc2VzNTExZ2YycXMxbWdwcXZxNG0ifQ.QaFFptIm4YgDtKu9eOjLrA&limit=1';

	request({ url: geocodeURL, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!');
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search!');
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;



//     const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FsbHlheiIsImEiOiJja2c2eHJ3MmMwMXllMnduNHR5OGdwdGxkIn0.-8FJ4k-tEvMp6P6aBjAoBg&%D7%9A%D7%9F%D7%A6%D7%9F%D7%90=1';
