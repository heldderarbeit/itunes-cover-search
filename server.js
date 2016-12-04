'use strict';

const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');

const app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.set('views', __dirname + '/app/views');
app.use(express.static(require('path').join(__dirname, 'public')));

routes(app);

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
});