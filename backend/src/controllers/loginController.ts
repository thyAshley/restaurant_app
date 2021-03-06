import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';
import Restaurant from '../models/restaurantModel';

const generateToken = (id: string, isOwner: boolean) => {
  return jwt.sign({ id, isOwner }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { email, password } = req.body;
  try {
    const cleanupEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanupEmail });
    if (user) {
      const result = await user.compare(password, user.password);
      if (result) {
        const token = generateToken(user._id, user.isOwner);
        return res.status(200).json({
          token,
        });
      }
    }
    return res
      .status(401)
      .json({ message: 'Invalid email or password, please try again' });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  let { name, email, password, isOwner } = req.body;
  if (!isOwner) isOwner = false;
  const registerUser = new User({
    name,
    email,
    password,
    isOwner,
  });
  try {
    const user = await registerUser.save();
    console.log(user);
    if (user) {
      const token = generateToken(user._id, isOwner);
      return res.status(201).json({
        token,
      });
    }
    return res.status(500).send({ message: 'an error has occur' });
  } catch (error) {
    return res.status(500).send({ message: 'an error has occur' });
  }
};

export const registerOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const {
    name,
    email,
    password,
    restaurantName,
    location,
    cuisine,
    capacity,
    startTime,
    stopTime,
    ambience,
  } = req.body;

  // const registerUser = new User({
  //   name,
  //   email,
  //   password,
  // });

  const registerRestaurant = new Restaurant({
    name: restaurantName,
    address: location,
    cuisine,
    openingHours: {
      startTime,
      stopTime,
    },
    ambience,
    pax: capacity,
  });

  try {
    // const user = await registerUser.save();
    await registerRestaurant.save();
    // if (user) {
    //   const token = generateToken(user._id);
    //   return res.status(201).json({
    //     token,
    //   });
    // }
    res.send('successful');
  } catch (error) {
    res.status(401);
    return next(error);
  }
};
