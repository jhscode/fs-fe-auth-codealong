const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const tokenService = require("./tokenService");
const jwt = require("jsonwebtoken");
const config = require("./config.json");
const app = express();
const PORT = 8080;

const uri = "mongodb://localhost:27017/auth";
mongoose.connect(uri);

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      user
        .comparePassword(password)
        .then(isMatch => {
          if (isMatch) {
            const token = tokenService.create(user);
            res.status(200).json({
              message: "success",
              payload: token
            });
          } else {
            res.status(400).json({ message: "unauthorized" });
          }
        })
        .catch(err => {
          res.status(500).json({
            message: err.message
          });
        });
    } else {
      res.status(400).json({
        message: "unauthorized"
      });
    }
  });
});

app.post("/user", (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password
  });
  user
    .save()
    .then(doc => {
      res.status(200).json({
        message: "success",
        payload: doc
      });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

app.get("/user/current", (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    res.status(401).json({
      message: "unauthorized"
    });
  }

  const token = authHeader.split(" ")[1]; // grab just the token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (decoded) {
      res.status(200).json({ decoded });
    } else {
      res.status(401).json({ message: "forbidden" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
