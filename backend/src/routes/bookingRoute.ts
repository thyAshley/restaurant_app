import express from 'express';

import {authMiddleWare} from '../middleware/authMiddleware'
import {makeBooking, getBookingByUser} from '../controllers/bookingController'

const router = express.Router();

router.route('/:restaurantId')
.post(authMiddleWare, makeBooking)

router.get('/', authMiddleWare, getBookingByUser);


export default router;