"use strict"
var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    images: String,
    title: String,
    description: String,
    price: Number
});

var Books = mongoose.model('Books', bookSchema);
module.exports = Books;