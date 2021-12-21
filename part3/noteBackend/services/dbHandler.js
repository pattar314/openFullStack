const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl= `mongodb+srv://patsdroid18:${process.env.MONGO_PWD}@openfullstackdb.ybvh3.mongodb.net/openfullstackdb?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl);


const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);



const createNote = ({content, important}) => {
    const note = new Note ({
        content: content,
        date: new Date(),
        important: important,
    })
    
    mongoose.connect(mongoUrl);
    note.save().then(result => {
    console.log('note saved!');
    mongoose.connection.close(); 
    })
}

const readAll = () => {
    Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
    })
}

const readNote = ({tofind}) =>{
    Note.find(toFind).then(result => {
        return result
    })
}

const updateNote = ({id, updatedData}) => {
    null
}

const deleteNote =({id}) => {
   Note.deleteOne({id: id})
}