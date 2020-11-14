import {Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import User from '../models/userModel'
// @desc Login Existing User
// @route POST /api/v1/login
// @access Public
const generateToken = (id: string) => {
  return jwt.sign({id}, process.env.JWT_SECRET!, {expiresIn: '1d'})
}


export const login = async (req:Request, res:Response) => {
  const {email, password} = req.body;
  const cleanupEmail = email.trim().toLowerCase();
  try {
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

// @desc Register New User
// @route POST /api/v1/register
// @access Public
export const register = async (req:Request, res:Response) => {
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
    console.log(error);
    return res.status(401).json(error.message)
  }
}
