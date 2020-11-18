import express from 'express';

import {addReview, getReviewByRestaurantId} from '../controllers/reviewController'
import {authMiddleWare} from '../middleware/authMiddleware'

const router = express.Router();

router.route('/:bookingId')
.post(authMiddleWare, addReview)

router.route('/:restaurantId')
.get(getReviewByRestaurantId)

export default router;