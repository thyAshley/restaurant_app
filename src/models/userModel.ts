import mongoose, {Document} from 'mongoose';
import {IUser} from '../types/models'

interface IUserDocument extends IUser, Document {}

import bcryptjs from 'bcryptjs';

const userModel = new mongoose.Schema({
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
  const salt = await bcryptjs.genSalt(10);
  this.email = this.email.trim().toLowerCase();
  this.password = await bcryptjs.hash(this.password, salt)
  next();
})


export default mongoose.model<IUserDocument>('User', userModel)

