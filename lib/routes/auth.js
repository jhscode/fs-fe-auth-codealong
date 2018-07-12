const express = require('express')
const Router = express.Router
const router = Router()
const { issueToken } = require('../middleware/auth')
const User = require('../models/user')

const findUserByEmail = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      req.user = user
      next()
    } else {
      next(new Error('not found'))
    }
  } catch (e) {
    next(e)
  }
}

router.post('/login', findUserByEmail, issueToken, async (req, res, next) => {
  const { token } = req
  if (token) {
    res.status(200).json({ token })
  } else {
    next(new Error('internal server error'))
  }
})

router.post('/signup', (req, res) => {
  const { email, password } = req.body
  const user = new User({ email, password })
  user
    .save()
    .then(doc => {
      res.status(200).json({
        message: 'success',
        payload: doc
      })
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})

module.exports = router
