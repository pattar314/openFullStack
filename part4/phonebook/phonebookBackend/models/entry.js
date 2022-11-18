const process = require('process')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)


const phoneEntry = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  number: {
    type: Number,
    minlength: 8,
    required: true
  },
})
phoneEntry.plugin(uniqueValidator)


phoneEntry.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('PhoneEntry', phoneEntry)