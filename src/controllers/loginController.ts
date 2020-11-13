import {Request, Response} from 'express'

// @desc Login Existing User
// @route POST /api/v1/login
// @access Public
export const login = (req:Request, res:Response) => {
  const {email, password} = req.body;

  res.json({email, password})
}

// @desc Register New User
// @route POST /api/v1/register
// @access Public
export const register = (req:Request, res:Response) => {
  const {name, email, password} = req.body;

  res.json({name, email, password})
}
