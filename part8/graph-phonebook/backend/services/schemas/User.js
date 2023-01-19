import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }]
})

export default mongoose.model('User', UserSchema)