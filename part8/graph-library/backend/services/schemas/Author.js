const mongoose  = require("mongoose")

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  born: {
    type: Number
  },
  bookList: {
    type: mongoose.Types.ObjectId,
    ref: 'Book'
  }
})

module.exports = mongoose.model('Author', authorSchema)