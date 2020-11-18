import express from 'express';

import {getRestaurant, getRestaurantById,getRestaurantsByName} from '../controllers/restaurantController'

const router = express.Router();

router.route('/')
.get(getRestaurant)
.post(getRestaurantsByName)

router.get('/:restaurantId', getRestaurantById);


export default router;