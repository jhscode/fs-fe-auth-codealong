const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/user')

const { verifyToken } = require('../middleware/auth')

router.get('/current', verifyToken, (req, res) => {
  const { user } = req.token
  if (user && user.id) {
    User.findById(user.id)
            .then(user => {
              res.status(200).send({
                message: 'success',
                payload: user
              })
            })
  } else {
    res.status(401).send({
      message: 'forbidden'
    })
  }
})

module.exports = router
