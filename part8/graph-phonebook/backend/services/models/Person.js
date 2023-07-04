const mongoose = require("mongoose")

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    minLength: 5
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  friendOf: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

module.exports = mongoose.model('Person', PersonSchema)
