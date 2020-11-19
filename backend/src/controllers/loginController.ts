import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/userModel'

const generateToken = (id: string) => {
  return jwt.sign({id}, process.env.JWT_SECRET!, {expiresIn: '1d'})
}


export const login = async (req:Request, res:Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()[0].msg})
  }
  const {email, password} = req.body;
  try {
    const cleanupEmail = email.trim().toLowerCase();
    const user = await User.findOne({email: cleanupEmail});
    if (user) {
      const result = await user.compare(password, user.password)
      if (result) {
        const token = generateToken(user._id)
        return res.status(200).json({
          token
        })
      }
    }
    return res.status(401).json({message: 'Invalid email or password, please try again'})
  } catch (error) {
    return res.status(401).json(error)
  }
}

export const register = async (req:Request, res:Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()[0].msg})
  }

  const {name, email, password} = req.body;
  const registerUser = new User({
    name,
    email,
    password
  })
  try {
    const user = await registerUser.save();
    if (user) {
      const token = generateToken(user._id)
      return res.status(201).json({
        token
      })
    }
  } catch (error) {
    if (error.keyPattern.email) {
      res.status(401)
      return next(new Error('Email Already Exist'))
    }
    res.status(401)
    return next(error)
  }
}
