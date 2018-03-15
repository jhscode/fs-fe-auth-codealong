const express = require("express");

const app = express();
const PORT = 8080;

app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "hello world"
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
