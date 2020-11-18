import {NextFunction, Request, Response} from 'express'

import Restaurant from '../models/restaurantModel';

export const getRestaurant = async (req:Request, res:Response) => {
    let {limit} = req.query;
    limit = limit || '20';

    try {
        const restaurants = await Restaurant.find().limit(+limit).sort({createdAt: 'desc'});
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

export const addRestaurant = async (req:Request, res:Response, next: NextFunction) => {

}