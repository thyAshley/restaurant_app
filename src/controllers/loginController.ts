import {Request, Response} from 'express'
import User from '../models/userModel'
// @desc Login Existing User
// @route POST /api/v1/login
// @access Public
export const login = async (req:Request, res:Response) => {
  const {email, password} = req.body;
  const cleanupEmail = email.trim().toLowerCase();
  try {
    const user = await User.findOne({email: cleanupEmail})
    if (user) {
      const result = await user.compare(password, user.password)
      console.log(result)

      if (result) {
        return res.status(200).json({
          message: 'login successfully'
        })
      }
    }
    return res.status(401).json({message: 'Invalid email or password, please try again'})
  } catch (error) {
    return res.json(error)
  }
}

// @desc Register New User
// @route POST /api/v1/register
// @access Public
export const register = (req:Request, res:Response) => {
  const {name, email, password} = req.body;

  res.json({name, email, password})
}
