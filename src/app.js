const path = require('path'); // core module before npm module
const express = require('express'); // express is actually a function
const hbs = require('hbs'); // for the partials
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express(); // we can configure our server by using various methods provided by the app itself
const port = process.env.PORT || 3001;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // set up handlebars
app.set('views', viewsPath); // set the views to point to the path
hbs.registerPartials(partialsPath); // path to the partials

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//render allows us to render one of our views
app.get('', (req, res) => {
	res.render('index', {
		title: 'Welcome',
		name: 'some pokemon',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text',
		title: 'Help',
		name: 'some pokemon',
	});
});

// app.get('/weather', (req, res) => {
//   res.send({
//     forecast: 'It is raining',
//     location: 'Tel-Aviv',
//     address: req.query.address,
//   });
// });

app.get('/weather', (req, res) => {
  console.log(req.query.address);
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!',
		});
	}
	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}
			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});

// setting a query string
// The query string comes after ? in the URL
// http://localhost:3001/products?search=game&rating=5
app.get('/products', (req, res) => {
	console.log(req.query); // access the additional values passed along with express
	if (!req.query.search) { // if no search term is given
		return res.send({ // error that comes very often - we cant do 2 res.send - we cant request twice
			error: 'You must provide a search term', // by using return, exits and not doing second res.send
		});
	}
	res.send({
		products: [],
	});
});

// setting page not found error
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Some pokemon on the error page',
		errorMessage: 'Page not found.',
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
