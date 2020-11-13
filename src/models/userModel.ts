import mongoose, {Document} from 'mongoose';
import {IUser} from '../types/models'

interface IUserDocument extends IUser, Document {}

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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

export default mongoose.model<IUserDocument>('User', userModel)