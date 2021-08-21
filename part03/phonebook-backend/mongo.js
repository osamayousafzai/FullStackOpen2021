const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

// mongo dabase credentials
const databaseName = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USERNAME;
const server = process.env.DATABASE_SERVER;
const password = process.argv[2];

const url = `mongodb+srv://${username}:${password}@${server}/${databaseName}?retryWrites=true`;

// mongo: make connection to database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

// create schema for phobebook
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    minLength: 8
  }
});

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator);

// create a model
const Person = mongoose.model('Person', personSchema);

// fuction to create new phonebook entry
const createPhonebookEntry = (name, number) => {
  return new Person({
    name: name,
    number: number,
    date: new Date()
  });
};

if(process.argv.length === 3){
  // get all persons from database
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    //close connection
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // create a person to save
  const name = process.argv[3];
  const number = process.argv[4];
  const newEntry = createPhonebookEntry(name, number);
  // save person to database
  newEntry.save().then(result => {
    console.log('added',result.name,'number',result.number,'to phonebook');
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}