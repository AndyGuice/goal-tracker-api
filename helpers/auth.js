import jwt from "jsonwebtoken"

export const randomStringGenerator = (length) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'

  // Pick characers randomly
  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return str
}

export const tokenGenerator = (user) => {
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4h"
    }
  )
<<<<<<< HEAD

=======
  console.log('JWT: ', token)
>>>>>>> 721283b047727b203bddf10d9d9535a6418c9c09
  return token
}
