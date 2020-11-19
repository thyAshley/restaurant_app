import express from 'express';

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
        console.log(restaurant)
        if (restaurant) {
            const file: any = req.files
            if (!file) {
                const error = new Error('Please upload a file')
                return next(error)
            }
            restaurant!.images[0] = file[0].filename
            restaurant!.images[1] = file[1].filename
            restaurant!.images[2] = file[2].filename
            const result = await restaurant.save();
            next()
        }
    } catch (error) {
        console.log(error)
    }
}, (req,res,next) => {
})

export default router;