import express from 'express';

import {getRestaurant, getRestaurantById,getRestaurantsByName} from '../controllers/restaurantController'
import uploadMiddleware from '../middleware/uploadMiddleware';

const router = express.Router();

router.route('/')
.get(getRestaurant)
.post(getRestaurantsByName)

router.get('/:restaurantId', getRestaurantById);

router.post('/upload', uploadMiddleware.single('file'), (req,res,next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        return next(error)
    }
        res.send(file)
})

export default router;