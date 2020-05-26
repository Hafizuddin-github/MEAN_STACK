const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('',(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then(createdPost => {
      res.status(201).json({
        message: 'Post added sucessfully!',
        postId: createdPost._id
      });
    });
})

router.get('',(req, res, next) =>{
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: "Post fetched!",
        posts: documents
      })
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({_id: id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Deleted id!'
      });
    }).catch(err => {
      console.log(err)
    });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
      res.status(200).json({ message: "Updated successfully!"});
    });

});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found!'});
      }
    })
});

module.exports = router;
