import User from '../models/userModel'
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

import connectDb from '../db';

const userData = [
  {
    name: 'Joe',
    email: 'joe@test.com',
    password: bcrypt.hashSync('123123', bcrypt.genSaltSync(10))
  },
  {
    name: 'John',
    email: 'john@test.com',
    password: bcrypt.hashSync('123123', bcrypt.genSaltSync(10))
  },
  {
    name: 'Admin',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123123', bcrypt.genSaltSync(10)),
    isAdmin: true
  }
]

const seedUser = async () => {
  try {
    await connectDb();
    console.log('deleting existing users')
    await User.deleteMany({})
    console.log('adding new seeded users')
    await User.insertMany(userData);
    console.log('user seeding completed, process exiting')
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