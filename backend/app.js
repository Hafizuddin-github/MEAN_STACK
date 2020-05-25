const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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
    'GET,POST,PATCH,DELETE,OPTIONS');
    next();
});

app.post('/api/posts',(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added sucessfully!'
  });
})

app.get('/api/posts',(req, res, next) =>{
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: "Post fetched!",
        posts: documents
      })
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({_id: id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Deleted id!'
      });
    });
});

module.exports = app;
