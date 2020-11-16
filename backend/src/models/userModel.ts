import mongoose, {Document, Schema} from 'mongoose';
import {IUser} from '../types/models'

interface IUserDocument extends IUser, Document {}

import bcryptjs from 'bcryptjs';

const userModel = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isOwner: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})
userModel.method('compare', function(enteredPassword: string, dbPassword: string) {
  return bcryptjs.compare(enteredPassword, dbPassword)
})

userModel.pre<IUserDocument>("save", async function(next) {
  const validateEmail = this.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  if (!validateEmail) next(new Error('Please provide a correct email'))
  
  const validatePassword = this.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/);
  if (!validatePassword) next(new Error('Your password should be at least 6 character and contain letters, number and a special character'));
  
  const salt = await bcryptjs.genSalt(10);
  this.email = this.email.trim().toLowerCase();
  this.password = await bcryptjs.hash(this.password, salt)
  next();
})


export default mongoose.model<IUserDocument>('User', userModel)

