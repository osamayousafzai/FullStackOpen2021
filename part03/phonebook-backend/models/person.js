const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// connet to mongo database
const url = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_SERVER}/${process.env.DATABASE_NAME}?retryWrites=true`;

console.log('connecting to', url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// create schema for phobebook
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 5
  },
  number: {
    type: String,
    required: true,
    minLength: 8
  },
  date: {
    type: Date
  }
});

// formate the object returned by mongoos. modify it toJSON method of the schema
// remove the the id field _id and mongo versioning field __v.
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);