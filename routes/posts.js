var express = require('express');
var router = express.Router();

const ObjectId = require('mongodb').ObjectId;

//INDEX
router.get('/', function(req, res, next) {
  db.collection('posts').find().sort({_id:-1}).toArray(function(err, result) {
    if (err) throw err;
    
    res.render('post/index', {posts: result});
  });
});

//CREATE
router.get('/create', function(req, res, next) {
  res.render('post/create');
});

//STORE
router.post('/', function(req, res, next) {
  db.collection('posts').insertOne(req.body, (err, result) => {
    if (err) throw err;
  
    res.redirect('/');
  });
});

//SHOW
router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  db.collection('posts').findOne(ObjectId(id), (err, result) => {
    if (err) throw err;

    res.render('post/show', { post: result });
  });
});

//EDIT
router.get('/:id/edit', function(req, res, next) {
  var id = req.params.id;

  db.collection('posts').findOne(ObjectId(id), (err, result) => {
    if (err) throw err;

    res.render('post/edit', { post: result });
  });
});

//UPDATE
router.put('/:id', function(req, res, next) {
  var id = req.params.id;

  db.collection('posts').updateOne({_id: ObjectId(id)}, {$set: req.body}, (err, result) => {
    if (err) throw err;

    res.redirect('/');
  });
});

//DELETE
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  db.collection('posts').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) throw err;

    res.redirect('/');
  });
});

module.exports = router;
