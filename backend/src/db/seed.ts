import User from '../models/userModel'
import Restaurant from '../models/restaurantModel';
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
  }

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