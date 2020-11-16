import {Request, Response, NextFunction} from 'express'
import moment from 'moment'

import Booking from '../models/bookingModel';
import Restaurant from '../models/restaurantModel'

export const makeBooking = async (req: Request, res: Response, next: NextFunction) => {
    const {date, numberOfPax, time} = req.body;
    const formatDate = moment(date).format('DD/MM/yyyy');
    const restaurantId = req.params.restaurantId;
    const formatTime = moment.utc(time, "HH").format('HH:mm')
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            console.log(restaurant);
            return next(new Error('Invalid Restaurant ID, please try again'))
        }
        console.log(restaurant)
    } catch (error) {
        return res.send(error.message);
    }

}