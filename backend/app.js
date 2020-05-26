const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://admin:password!@cluster0-q1x7x.gcp.mongodb.net/node-angular?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to DB');
  })
  .catch(() => {
    console.log('Connection error');
  });

app.use(bodyParser.json());

//not needed here but just add
app.use(bodyParser.urlencoded({extended: false}));

//Handles CORS errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Resquested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    'GET,POST,PATCH,PUT,DELETE,OPTIONS');
    next();
});

app.use('/api/posts/',postsRoutes);



module.exports = app;
