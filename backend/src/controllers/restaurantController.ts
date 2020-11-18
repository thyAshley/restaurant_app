import {NextFunction, Request, Response} from 'express'
import { nextTick } from 'process';

import Restaurant from '../models/restaurantModel';

export const getRestaurant = async (req:Request, res:Response) => {
    try {
        const restaurants = await Restaurant.find();
        res.send(restaurants);
        
    } catch (error) {
        console.log(error)
    }
}

export const getRestaurantById = async (req:Request, res:Response, next: NextFunction) => {
    const {restaurantId} = req.params
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (restaurant) {
            res.send(restaurant);
        } else {
            res.status(404);
            next(new Error('No Restaurant Found'))
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const getRestaurantsByName = async (req:Request, res:Response, next: NextFunction) => {
    const {name} = req.body;
    try {
        const restaurant = await Restaurant.find({name: {'$regex': name, '$options' : 'i'}});
        if (restaurant) {
            res.send(restaurant);
        } else {
            res.status(404);
            next(new Error('No Restaurant Found'))
        }
        
    } catch (error) {
        console.log(error)
    }
}