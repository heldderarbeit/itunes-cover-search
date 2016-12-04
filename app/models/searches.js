'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Search = new Schema({
    term: String
});

module.exports = mongoose.model('Search', Search);