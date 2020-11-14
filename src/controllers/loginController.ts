import {Request, Response} from 'express'
import User from '../models/userModel'
// @desc Login Existing User
// @route POST /api/v1/login
// @access Public
export const login = async (req:Request, res:Response) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email: email})
    if (user) {
      const result = await user.compare(password, user.password)
      if (result) {
        res.status(200).json({
          message: 'login successfully'
        })
      }
    }
    res.status(401).json({message: 'Invalid email or password, please try again'})
  } catch (error) {
    res.json(error)
  }
}

// @desc Register New User
// @route POST /api/v1/register
// @access Public
export const register = (req:Request, res:Response) => {
  const {name, email, password} = req.body;

  res.json({name, email, password})
}
