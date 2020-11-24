import User from '../models/userModel'
import Restaurant from '../models/restaurantModel';
import Booking from '../models/bookingModel';
import Review from '../models/reviewModel';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

import connectDb from '../db';

const userData = [
  {
    _id: '5fb0bcd8d354365c58e25420',
    name: 'Joe',
    email: 'joe@test.com',
    password: bcrypt.hashSync('123123', bcrypt.genSaltSync(10))
  },
  {
    _id: '5fb0bcd8d354365c58e25421',
    name: 'John',
    email: 'john@test.com',
    password: bcrypt.hashSync('123123', bcrypt.genSaltSync(10))
  },
  {
    _id: '5fb0bcd8d354365c58e25422',
    name: 'Admin',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123123', bcrypt.genSaltSync(10)),
    isAdmin: true
  },
  {
    _id: '5fb0bcd8d354365c58e25423',
    name: 'Yu Siang',
    email: 'yusiang@test.com',
    password: bcrypt.hashSync('123123', bcrypt.genSaltSync(10)),
    isAdmin: true
  }
]

const restaurantData = [
  {
    _id: '5fb0bcd8d354365c58e25410',
    name: 'mcdonald',
    address: 'test location 1234 singapore 123456',
    cuisine: 'fast food',
    openingHours: {
      startTime: 10,
      stopTime: 22,
    },
    pax: 5,
  },
  {
    _id: '5fb0bcd8d354365c58e25411',
    name: 'kfc',
    address: 'test location 4321 singapore 654321',
    cuisine: 'fast food',
    openingHours: {
      startTime: 0,
      stopTime: 0,
    },
    pax: 20,
  },
  {
    _id: '5fb0bcd8d354365c58e25412',
    name: 'subway',
    address: 'test location 4321 singapore 654321',
    cuisine: 'bread',
    openingHours: {
      startTime: 12,
      stopTime: 20,
    },
    pax: 10,
  }
]

const bookingData = [
  {
    _id: '5fb0bcd8d354365c58e25430',
    userId: '5fb0bcd8d354365c58e25420',
    restaurantId: '5fb0bcd8d354365c58e25410',
    date: "2020-11-28",
    time: 17,
    numberOfPax: 2,
  },
  {
    _id: '5fb0bcd8d354365c58e25431',
    userId: '5fb0bcd8d354365c58e25420',
    restaurantId: '5fb0bcd8d354365c58e25410',
    date: "2020-11-27",
    time: 15,
    numberOfPax: 5
  },
  {
    _id: '5fb0bcd8d354365c58e25432',
    userId: '5fb0bcd8d354365c58e25420',
    restaurantId: '5fb0bcd8d354365c58e25411',
    date: "2020-11-24",
    time: 12,
    numberOfPax: 3,
    hasReview: true
  },
  {
    _id: '5fb0bcd8d354365c58e25433',
    userId: '5fb0bcd8d354365c58e25423',
    restaurantId: '5fb0bcd8d354365c58e25412',
    date: "2020-11-22",
    time: 18,
    numberOfPax: 3,
  },
]

const reviewData = [
  {
    _id: '5fb0bcd8d354365c58e25440',
    bookingId: '5fb0bcd8d354365c58e25432',
    userId: '5fb0bcd8d354365c58e25420',
    restaurantId: '5fb0bcd8d354365c58e25411',
    rating: 3,
    comment: 'zai'
  },
]
const seedUser = async () => {
  try {
    await connectDb();
    console.log('deleting existing users')
    await User.deleteMany({})
    console.log('adding new seeded users')
    await User.insertMany(userData);
    console.log('deleting existing restaurants')
    await Restaurant.deleteMany({});
    console.log('adding new restaurants');
    await Restaurant.insertMany(restaurantData);
    console.log('deleting existing bookings')
    await Booking.deleteMany({});
    console.log('adding new bookings');
    await Booking.insertMany(bookingData);
    console.log('deleting existing reviews')
    await Review.deleteMany({});
    console.log('adding new reviews');
    await Review.insertMany(reviewData);
    console.log('seeding completed, process exiting')
  } catch (error) {
    console.log(error)
  }
  process.exit(1);
}

if (process.argv[2] === 'populate') {
  seedUser()
} else {
  console.log('populate to insert data')
}