import express from 'express';
import fs from 'fs';
import path from 'path';

import Restaurant from '../models/restaurantModel'
import {getRestaurant, getRestaurantById,getRestaurantsByName} from '../controllers/restaurantController'
import uploadMiddleware from '../middleware/uploadMiddleware';

const router = express.Router();

router.route('/')
.get(getRestaurant)
.post(getRestaurantsByName)

router.get('/:restaurantId', getRestaurantById);

router.post('/:restaurantId/upload', uploadMiddleware.array('file', 3), async (req,res,next) => {
    const restaurantId = req.params.restaurantId; 
    try {
        const restaurant = await Restaurant.findById(restaurantId)
        if (restaurant) {
            const file: any = req.files
            if (!file) {
                const error = new Error('Please upload a file')
                return next(error)
            }
            restaurant!.images = [
                file[0]?.filename || restaurant.images[0],
                file[1]?.filename || restaurant.images[1],
                file[2]?.filename || restaurant.images[2],
            ]
            const result = await restaurant.save();
            return res.send(result)
        }
        res.status(401)
        next(new Error('Restaurant Not Found, Please Try Again'))
    } catch (error) {
        console.log(error)
        next(new Error('Something went wrong'))
    }
})

export default router;