const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/admin-routes');

const HttpError = require('./models/http-error');

const app = express();

// app.use(cors());
//cors handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //which domains should have access - any domain can send incoming requests

  //specify which headers incoming requests may have
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  //which http methods can be attached to incoming requests
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

//app.use(bodyParser.urlencoded({ extended: false })); //parse incoming request, urlencoded data in body will be extracted
app.use(bodyParser.json()); //get data from form - by parsing the body of the request //parse incoming requests for json data

app.use('/api/admin', adminRoutes);

//if route not found (from previous middleware)
app.use((req, res, next) => {
  const err = new HttpError('could not find route', 404);
  throw err;
});

// handler for all previous middleware yielding errors
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error); //forward the error
  }

  //here no response has been set yet
  res.status(error.code || 500);
  res.json({ message: error.message || 'an unknown error occured' });
});

if (!process.env.DB_USERNAME) {
  const error = new HttpError('.env needs DB_USERNAME');
  return next(error);
}
if (!process.env.DB_PASSWORD) {
  const error = new HttpError('.env needs DB_PASSWORD');
  return next(error);
}

mongoose
  .connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-hxcxvdr-shard-00-00.517767p.mongodb.net:27017,ac-hxcxvdr-shard-00-01.517767p.mongodb.net:27017,ac-hxcxvdr-shard-00-02.517767p.mongodb.net:27017/?ssl=true&replicaSet=atlas-stbdax-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('listening on port 5000...');
    app.listen(5000);
  })
  .catch((err) => {
    console.log('err: ', err);
  });
