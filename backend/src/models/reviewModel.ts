import mongoose, {Document} from 'mongoose';
import {IReview} from '../types/models'

interface IReviewDocument extends IReview, Document {}

const reviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    min: 0,
    max: 5,
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  }
}, {
  timestamps: true
})

export default mongoose.model<IReviewDocument>('Review', reviewSchema)