const mongoose = require('mongoose')
require('dotenv').config()


const phoneSchema = new mongoose.Schema({
    name: String,
    number: Number,
});

const PhoneEntry = mongoose.model('PhoneEntry', phoneSchema);



const mongoUrl= `mongodb+srv://patsdroid18:${process.env.MONGO_PWD}@openfullstackdb.ybvh3.mongodb.net/openfullstackPhone?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl);
console.log('mongo connected')

if (process.argv.length === 3){
    console.log('fetching all')
    PhoneEntry.find({}).then(results => {
        console.log('phonebook: ')
        results.forEach(result => console.log(`${result.name}: ${result.number}`))
        mongoose.connection.close();
    })
} else {
    const name = process.argv[3]
    const number = process.argv[4]
    const phone = new PhoneEntry ({
        name: `${name}`,
        number: number,
    })
    console.log(`new entry: ${name}: ${number}`)
    phone.save().then(result => {
        console.log(`phone saved: ${result}`);
        mongoose.connection.close();
    })
  }
 


/* Note.find({important: "false"}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
 */