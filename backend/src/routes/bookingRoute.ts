import express from 'express';

import {authMiddleWare} from '../middleware/authMiddleware'
import {makeBooking} from '../controllers/bookingController'

const router = express.Router();

router.post('/:restaurantId', authMiddleWare, makeBooking);

export default router;