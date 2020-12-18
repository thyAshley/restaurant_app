import mongoose, { Document } from 'mongoose';
import { IRestaurant } from '../types/models';

interface IRestaurantDocument extends IRestaurant, Document {}

const restaurantSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    openingHours: {
      startTime: {
        type: Number,
        required: true,
        min: 0,
        max: 24,
      },
      stopTime: {
        type: Number,
        required: true,
        min: 0,
        max: 24,
      },
    },
    review: {
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    images: {
      type: [],
    },
    ambience: {
      type: Boolean,
    },
    ambienceSeats: {
      type: [],
    },
    ambienceSeating: {
      type: [],
    },
    menu: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    pax: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRestaurantDocument>(
  'Restaurant',
  restaurantSchema,
);
