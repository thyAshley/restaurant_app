import {Request, Response, NextFunction} from 'express'
import moment from 'moment'

import Booking from '../models/bookingModel';
import Restaurant from '../models/restaurantModel'

export const makeBooking = async (req: Request, res: Response, next: NextFunction) => {
    const {date, numberOfPax, time} = req.body;
    const restaurantId = req.params.restaurantId;
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            console.log(restaurant);
            return next(new Error('Invalid Restaurant ID, please try again'))
        }
        
        const bookingDetail = new Booking({
            userId: res.locals.user._id,
            restaurantId: restaurant._id,
            date: moment(date).format('DD/MM/yyyy'),
            time: moment.utc(time, "HH").format('HH:mm'),
            numberOfPax
        })
        const result = await bookingDetail.save();
        return res.status(200).json(result);
    } catch (error) {
        return res.send(error.message);
    }

}