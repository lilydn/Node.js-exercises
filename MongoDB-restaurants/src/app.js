const express = require('express');
const restaurantRouter = require('./routes/restaurant.routes');
const Restaurant = require('./models/restaurant');
require('./db/mongoose'); 

const app = express();

app.use(express.json());
app.use(restaurantRouter);

module.exports = app;

// Create 5 different objects and save them to your collection.

addToCollection('Cafe Mae Mae', 'Manhattan', 'American', 1, 70, 'Vandam Street', '10013', -74.2324, 44.12341);
addToCollection('Mi Sueno Restaurant', 'Bronx', 'Latin', 2, 124, 'West Fordham Road', '', -72.424, 34.568);
addToCollection('Danny\'S Pizzeria & Cafe', 'Brooklyn', 'Pizza/Italian', 3, 145, 'Court Street', 13501, -73.324, 24.4369);
addToCollection('El Charro Bakery', '', 'Bakery', 4, 2456, 'Myrtle Avenue', 11201, -73.32424, 54.322169);
addToCollection('Broadway Pizza & Pasta', 'Bronx', 'Pizza/Italian', 5, 55, 'West 231 Street', 10463, -73.3847, 40.2425);

function addToCollection(name, borough, cuisine, restaurant_id, building, street, zipcode, lat, lon) {
  const res = new Restaurant({
    name,
    borough,
    cuisine,
    restaurant_id,
    address: {
      building,
      street,
      zipcode,
      coord: {
        lat,
        lon,
      }
    }
  });

  res.save().then(() => {
    console.log(res);
  }).catch(error => {
    console.log('error', error);
  });
}



