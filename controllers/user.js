import bcrypt from "bcryptjs"
import dotenv from 'dotenv'
import User from "../models/user.js"
import * as EmailValidator from 'email-validator'
import {
  tokenGenerator
} from '../helpers/auth.js'

dotenv.config()

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) return res.status(200).json({ error: "Invalid login or password" })

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) return res.status(200).json({ error: "Invalid login or password" })

    const token = tokenGenerator(user)

    res.status(200).json({ result: user, token })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body

  try {
    if (!firstName || firstName?.trim()?.length === 0) return res.status(200).json({ error: "No first name given" })
    if (!lastName || lastName?.trim()?.length === 0) return res.status(200).json({ error: "No last name name given" })
    if (!email || email?.trim()?.length === 0) return res.status(200).json({ error: "No email given" })
    if (!EmailValidator.validate(email)) return res.status(200).json({ error: "Wrong email format" })
    if (!password || password?.trim()?.length === 0) return res.status(200).json({ error: "No password given" })

    const user = await User.findOne({ email })

    if (user) return res.status(200).json({ error: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create(
      {
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        admin: false
      })

    const token = tokenGenerator(result)
    console.log('Token: ', token)

    res.status(201).json({ result, token })

  } catch (error) {

    res.status(500).json({ message: "Something went wrong" })
    console.log(error)
  }
}
