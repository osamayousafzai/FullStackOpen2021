const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

const cors = require('cors');

const app = express();

//////////////////////// middlewares

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

//// morgan
// define custom token for post request (exercise: 3.8)
morgan.token('newPersonObject', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return null;
});
// use morgan middleware
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ');
}));

// Error handling
const errorHandler = (error, request, response, next) => {
  const serverMessage = 'Message from server: ';
  if (error.name === 'CastError') {
    return response.status(400).send({ error: `${serverMessage} malformatted id` });
  } else if(error.name === 'ValidationError') {
    if (error.errors.name) {
      const { kind, value } = error.errors.name;
      if (kind === 'minlength') {
        return response.status(400).send({ error: `${serverMessage} Name must contain atlest 5 characters long.` });
      } else if (kind === 'unique') {
        return response.status(400).send({ error: `${serverMessage} ${value} already exists.` });
      } else {
        return response.status(400).send({ error: `${serverMessage} Name must be supplied.` });
      }
    }

    if (error.errors.number) {
      const { kind } = error.errors.number;
      if (kind === 'minlength') {
        return response.status(400).send({ error: 'Server: Number must contain atlest 8 characters long.' });
      } else {
        return response.status(400).send({ error: 'Server: Number must be supplied' });
      }
    }
  } else {
    return response.status(400).send({ error: 'Server: Unknown Error' });
  }
  next(error);
};

//////////////////////// functions

// create new entry object
const createNewEntryObject = (name, number) => {
  const newObject = new Person({
    name: name,
    number: number,
    date: Date()
  });
  return newObject;
};

//////////////////////// routes / requests
// get requests
app.get('/info', (request, response) => {
  Person.find({})
    .then(persons => {
      response.send(`<p>Phonebook has info for ${persons.length} people.</p><br/><p>${new Date()}</p>`);
    });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(result => {
      if(result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// delete request
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

// post request
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;
  const newPersonObject = createNewEntryObject(name, number);

  // save to database
  newPersonObject.save()
    .then(result => {
      response.json(result);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number, date } = request.body;
  const { id } = request.params;

  const newPersonObject = {
    name: name,
    number: number,
    date: date
  };

  Person.findByIdAndUpdate(id, newPersonObject)
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error));
});

// erorHandler created above
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
