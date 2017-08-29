"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//API
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var Books = require('./models/books.js');

//------POST Books API-------//
app.post('/books', function(req,res) {
  var book = req.body;

  Books.create(book, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  })
});
//------GET Books API--------//
app.get('/books', function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  })
});
//-----DELETE Books API------//
app.delete('/books/:_id', function(req, res) {
  var query = {_id: req.params._id};

  Books.remove(query, function(err, books){
    if (err) {
      throw err;
    }
    res.json(books);
  })
});
//-----UPDATE/PUT Books Api-------//
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = req.params._id;
  //if field doesn't exist, $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  //when true returns updated document
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books){
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

//API End

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on port 3001');
});