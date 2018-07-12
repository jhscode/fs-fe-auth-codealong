const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('todo', todoSchema)
