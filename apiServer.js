"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//API
var mongoose = require('mongoose');
//MONGO LAB
mongoose.connect('mongodb://deepsun80:Tulsis79@ds121674.mlab.com:21674/react-redux-bookstore');
//LOCAL HOSTING
//mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error:'));
//---->>Set Up Sessions<<----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, //2 Days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

//----Save CART API Session-----
app.post('/cart', function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if (err) throw err;
    res.json(req.session.cart);
  })
});
//-----Get CART API Session------
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});
//---->>End Session Set up<<----

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
      console.log("# API DELETE BOOKS: ", err);
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

//----GET Books Images API---//
app.get('/images', (req, res) => {
  const imgFolder = __dirname + '/public/images';
  //Require File System
  const fs = require('fs');
  //Read all the files in the directory
  fs.readdir(imgFolder, (err, files) => {
    if (err) {        
      return console.error(err);      
    }
    //Create an Empty Array
    const filesArray = [];
    // Iterate all images in directory and add to array
    files.forEach((file) => {
      filesArray.push({name:file});
    });
    res.json(filesArray);
  });
});

//API End

app.listen(3001, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on port 3001');
});