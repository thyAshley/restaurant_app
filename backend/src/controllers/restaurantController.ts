import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Restaurant from '../models/restaurantModel';

export const getRestaurantByUser = async (req: Request, res: Response) => {
  console.log('here');
  const { userId } = req.params;
  try {
    const response = await Restaurant.findOne({ owner: userId });
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send('something went wrong');
  }
};

export const createRestaurantByUser = async (req: Request, res: Response) => {
  const {
    name,
    location,
    cuisine,
    capacity,
    openingHours,
    ambience,
    menu,
  } = req.body;
  if (!name || !location || !cuisine || !capacity || !openingHours || !menu) {
    return res.status(400).send({ message: 'Not filled in' });
  }
  try {
    console.log('here');
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).send({ message: 'Unauthorized' });
    }
    const result: any = await jwt.verify(token, process.env.JWT_SECRET!);
    const response = new Restaurant({
      name,
      address: location,
      cuisine,
      pax: capacity,
      openingHours,
      ambience: ambience || false,
      menu,
      owner: result.id,
    });

    const createdRestaurant = await response.save();
    res.status(200).send(createdRestaurant);
  } catch (error) {
    if (error.message === 'jwt malformed') {
      return res.status(404).send({ message: 'Unauthorized' });
    }
    console.log(error.message);
    res.status(500).send({ message: 'Unexpected error occur' });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  let { limit } = req.query;
  limit = limit || '20';
  try {
    let restaurants;
    restaurants = await Restaurant.find()
      .limit(+limit)
      .sort({ createdAt: 'desc' });

    res.send(restaurants);
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { restaurantId } = req.params;
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (restaurant) {
      return res.send(restaurant);
    } else {
      res.status(404);
      return next(new Error('No Restaurant Found'));
    }
  } catch (error) {
    console.log(error);
  }
};

// export const getRestaurantsByName = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { name } = req.body;
//   try {
//     const restaurant = await Restaurant.find({
//       name: { $regex: name, $options: "i" },
//     });
//     if (restaurant) {
//       res.send(restaurant);
//     } else {
//       res.status(404);
//       next(new Error("No Restaurant Found"));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
