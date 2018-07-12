const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/user')

const { verifyToken } = require('../middleware/auth')

const getUserById = async (req, res, next) => {
  const { user } = req.token
  if (user && user.id) {
    try {
      const doc = await User.findById(user.id)
      res.user = doc
    } catch (e) {
      next(e)
    }
  }
}

router.get('/current', verifyToken, getUserById, (req, res, next) => {
  if (req.user) {
    res.status(200).send(req.user)
  }
})

module.exports = router
