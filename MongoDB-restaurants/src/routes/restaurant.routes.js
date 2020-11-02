const express = require('express');
const router = new express.Router();
const Restaurant = require('../models/restaurant');

//Create POST endpoint /restaurant that saves item to DB
router.post('/restaurant', async (req, res) => {
	const restaurant = new Restaurant(req.body);

	try {
		await restaurant.save();
		res.status(201).send(restaurant);
	} catch (error) {
		res.status(400).send(error);
	}
});

//Create GET endpoint /restaurant/:id (or any other method) to fetch the relevant item
router.get('/restaurant/:id', async (req, res) => {
	try {
		const restaurant = await Restaurant.findOne({
			restaurant_id: req.params.id,
		});
		if (!restaurant) {
			return res.status(404).send();
		}
		res.send(restaurant);
	} catch (error) {
		res.status(500).send(error);
	}
});

//Create GET endpoint /restaurant/countByCuisine/:cuisine
//Will fetch all by given string and will return the count of restaurants
router.get('/restaurant/countByCuisine/:cuisine', async (req, res) => {
	try {
		const restaurantByCuisine = await Restaurant.find({
			cuisine: req.params.cuisine,
		});
		const count = await Restaurant.countDocuments({
			cuisine: req.params.cuisine,
		});
		res.status(200).send(restaurantByCuisine);
		console.log(count);
	} catch (error) {
		res.status(500).send(error);
	}
});

//Promise chaining
//Will fetch all by given string and will return the count of restaurants
router.get('/restaurant/countByBorough/:borough', (req, res) => {
	Restaurant.find({ borough: req.params.borough })
		.then(results => {
			res.status(200).send(results);
			return Restaurant.countDocuments({
				borough: req.params.borough,
			});
		})
		.then(count => {
			console.log(count);
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

//Create post or patch operation
//Update restaurant by id, and update specific fields (e.g. cuisine, borough, name)
router.patch('/restaurant/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'cuisine', 'borough'];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const restaurant = await Restaurant.findOneAndUpdate(
			{ restaurant_id: req.params.id }, req.body, { new: true, runValidators: true }
		);

		if (!restaurant) {
			return res.status(404).send();
		}
		res.send(restaurant);
	} catch (e) {
		res.status(400).send(e);
	}
});

//Create a delete endpoint to delete(restaurant) by id
router.delete('/restaurant/:id', async (req, res) => {
	try {
		const restaurant = await Restaurant.findOneAndDelete({
			restaurant_id: req.params.id,
		});

		if (!restaurant) {
			return res.status(404).send();
		}
		res.send(restaurant);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
