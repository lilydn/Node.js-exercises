const express = require('express');

const port =  process.env.PORT || 3030;
const app = express();
app.use(express.json()); 


// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// const bodyParser = require('body-parser')
// app.use(bodyParser.json());


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

// get users http://localhost:3030/users
app.get('/users', (req, res) => {
	res.json(users);
});

// get a user with specific id
app.get('/users/:id', (req, res) => {
	const { id } = req.params;
	const ans = findUserById(id, res);
	if (ans.error) {
		return res.send(ans);
	}
	const user = users[ans.index];
	res.json(user);
});

// create a user with post data - with req.body
app.post('/user', (req, res) => {
	const { username } = req.body;
	if (!username) {
		res.status(400);
		return res.send({
			error: 'username must be provided',
			code: res.statusCode,
		});
	}
	createNewUserAndPush(username);
	res.send(users);
});

// create a user with post data - with req.params
app.post('/user/:username', (req, res) => {
	let { username } = req.params;
	if (!username) {
		res.status(400);
		return res.send({
			error: 'username must be providedddd',
			code: res.statusCode,
		});
	}
	createNewUserAndPush(username);
	res.send(users);
});

// Delete a user: http://localhost:3030/user?id=1 with query string
app.delete('/user', (req, res) => {
	const { id } = req.query;
	const ans = findUserById(id, res);
	if (ans.error) {
		return res.send(ans);
	}
	users.splice(ans.index, 1);
	res.send(users);
});

// Update a user: http://localhost:3030/user?id=1 with a query string and post data
app.put('/user', (req, res) => {
	const { id } = req.query;
	const ans = findUserById(id, res);
	if (ans.error) {
		return res.send(ans);
	}
	const { username } = req.body;
	if (username) {
		findUserAndUpdate(ans.index, username);
	}
	res.send(users);
});

// Get Products http://localthost:3030/products
app.get('/products', (req, res) => {
	res.json(products);
});

// Create a product: http://localhost:3030/product with a post data
app.post('/products', (req, res) => {
	const { title, price } = req.body;
	if (!title || !price) {
		res.status(400);
		return res.send({
			error: 'title and price must be provided',
			code: res.statusCode,
		});
	}
	createNewProductAndPush(title, price);
	res.json(products);
});


// utility functions

createNewUserAndPush = username => {
	const newUser = {
		id: users[users.length - 1].id + 1,
		username,
	};
	users.push(newUser);
};

findUserById = (id, res) => {
	const index = users.findIndex(user => user.id === parseInt(id));
	if (!id || index === -1) {
		res.status(400);
		return {
			error: 'user not found',
			code: res.statusCode,
		};
	}
	return { index: index };
};

findUserAndUpdate = (index, updateValue) => {
	if (users[index] && updateValue) {
		users[index].username = updateValue;
	}
};

createNewProductAndPush = (title, price) => {
	const newProduct = {
		id: products[products.length - 1].id + 1,
		title,
		price,
	};
	products.push(newProduct);
};

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
