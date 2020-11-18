import {Request, Response} from 'express'

import Review from '../models/reviewModel'
import Restaurant from '../models/restaurantModel';

export const getRestaurant = async (req:Request, res:Response) => {
    try {
        const restaurants = await Restaurant.find();
        res.send(restaurants);
        
    } catch (error) {
        console.log(error)
    }
}


