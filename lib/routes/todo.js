const express = require("express");
const Router = express.Router;
const router = Router();
const Todo = require("../models/todo");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, (req, res) => {
  const { user } = req.token;
  Todo.find({ user: user.id })
    .then(docs => {
      res.status(200).send({
        message: "success",
        payload: docs
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

router.post("/", verifyToken, (req, res) => {
  const { description } = req.body;
  const { user } = req.token;
  const todo = new Todo({
    description,
    user: user.id
  });
  todo
    .save()
    .then(doc => {
      res.status(200).send({ message: "success", payload: doc });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
