const express = require('express');
const { create } = require('domain');
// const bodyParser = require('body-parser')
const app = express();

app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.json());

const port = 3030;

let users = [
	{
		id: 0,
		username: 'sample name0',
	},
	{
		id: 1,
		username: 'sample name1',
	},
];

let products = [
	{
		id: 0,
		title: 'sample product',
		price: '100',
	},
];

// app.post('/', function (req, res) {
//   res.send('Got a POST request')
// });

// get users http://localhost:3030/users
app.get('/users', (req, res) => {
	console.log(req);
	res.json(users);
});

// get a user with specific id
app.get('/users/:id', (req, res) => {
	userToSend = users.filter(user => user.id === req.params.id);
	res.json(userToSend);
});

// app.get('/user', (req, res)=>{
//   res.send('user added');
// });

// create a user with post data - with req.params
app.post('/user/:username', (req, res) => {
	let { username } = req.params;
	if (username) {
		users.push({
			id: users[users.length - 1].id + 1,
			username,
		});
	}
	res.send(users);
});

// create a user with post data - with req.body
app.post('/user', (req, res) => {
	const { username } = req.body;
  const newUser = 
    {  
      id: users[users.length - 1].id + 1,
      username,
    };
	res.send(newUser);
});

// Delete a user: http://localhost:3030/user?id=1 with query string

// Update a user: http://localhost:3030/user?id=1 with a query string and post data

// Get Products http://localthost:3030/products

// Create a product: http://localhost:3030/product with a post data

// The query string comes after ? in the URL
// http://localhost:3001/products?search=game&rating=5
app.get('/products', (req, res) => {
	console.log(req.query); // access the additional values passed along with express
	if (!req.query.search) {
		// if no search term is given
		return res.send({
			// error that comes very often - we cant do 2 res.send - we cant request twice
			error: 'You must provide a search term', // by using return, exits and not doing twice res.send
		});
	}
	res.send({
		products: [],
	});
});



createNew



app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
