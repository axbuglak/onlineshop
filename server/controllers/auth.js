import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// REGISTER //
export const register = async (req, res) => {
  // ***** req - запрос, res - ответ ***** //
  try {
    const { username, password } = req.body

    const isUsed = await User.findOne({ username })

    if (isUsed) {
      return res.json({
        message: 'Username is already used'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      password: hash
    })

    const token = jwt.sign(
      {
        id: newUser._id
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    await newUser.save()

    res.json({
      newUser,
      token,
      message: `User ${username} created`
    })
  } catch (error) {
    res.json({ message: 'Something went wrong' })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.json({
        message: 'User not found'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.json({
        message: 'Password is incorrect'
      })
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      token,
      user,
      message: `User ${username} logged in`
    })
  } catch (error) {
    res.json({ message: 'error' })
  }
}

// Get Me
export const getMe = async (req, res) => {
  try {
    const { userId } = req.body
    if(!userId) return res.json({ message: 'userId is required' })
    const user = await User.findById(userId)
    if (!user) return res.json({ message: 'User not found' })
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({ message: 'sucessfuly', user, token })
  } catch (error) {
    res.json({ message: 'Something went wrong' })
  }
}
