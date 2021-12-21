const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)


const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number,
});



phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v
    }
})
  


module.exports = mongoose.model('PhoneEntry', phoneSchema);