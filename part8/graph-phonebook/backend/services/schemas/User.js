import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }, 
  friends: [{
    type: mongoose.Types.ObjectId,
    ref: 'Person'
  }]
})

module.exports = mongoose.model('User', UserSchema)