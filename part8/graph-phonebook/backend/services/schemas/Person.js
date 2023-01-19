import { Schema } from 'mongoose'

const Person = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minlength: 5
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

export default mongoose.model(Person, Person)