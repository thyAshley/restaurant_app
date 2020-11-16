import mongoose, {Document} from 'mongoose';
import {IBooking} from '../types/models'

interface IBookingDocument extends IBooking, Document {}

const bookingSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  numberOfPax: {
    type: Number,
    required: true
  },
  hasReview: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
})

export default mongoose.model<IBookingDocument>('Booking', bookingSchema)