import User from '../models/userModel'
import * as dotenv from 'dotenv';
dotenv.config();

import connectDb from '../db';

connectDb();
const userData = [
  {
    name: 'Joe',
    email: 'Joe@gmail.com',
    password: 123
  },
  {
    name: 'John',
    email: 'John@gmail.com',
    password: 123
  }
]

const seedUser = async () => {
  console.log('test')
  try {
    const createdUser = await User.insertMany(userData);
    console.log(createdUser);
  } catch (error) {
    console.log(error)
  }
  console.log('completed seeding')
  process.exit(1);
}

if (process.argv[2] === '-d') {
  console.log('fail')
} else {
  seedUser()
}