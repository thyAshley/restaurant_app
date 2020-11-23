import express from 'express';

import {authMiddleWare} from '../middleware/authMiddleware'
import {makeBooking, getBookingByUser, removeBookingById} from '../controllers/bookingController'

const router = express.Router();

router.route('/:restaurantId')
.post(authMiddleWare, makeBooking)

router.get('/', authMiddleWare, getBookingByUser);
router.delete('/:bookingId', authMiddleWare, removeBookingById, getBookingByUser);


export default router;