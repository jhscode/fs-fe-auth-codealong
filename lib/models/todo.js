const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "user" }
});

module.exports = mongoose.model("todo", todoSchema);
