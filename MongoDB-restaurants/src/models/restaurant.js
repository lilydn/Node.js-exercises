const mongoose = require('mongoose');

const Restaurant = mongoose.model('Restaurant', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  borough: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  restaurant_id: {
    type: Number,
    required: true,
    unique: true,
    validate(value) {
      if (value < 0) {
        throw new Error('restaurant_id must be a positive number');
      }
    }
  },
  address: {
    building: {
      type: Number,
    },
    steet: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
    coord: {
      lat: {
        type: Number,
        validate(value) {
          if(value < -90 || value > 90) {
            throw new Error('invalid latitude');
          }
        }
      },
      lon: {
        type: Number,
        validate(value) {
          if(value < -180 || value > 180) {
            throw new Error('invalid longitude');
          }
        }
      }
    }
  }
});

module.exports = Restaurant;

