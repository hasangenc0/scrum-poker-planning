const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let app = express();

// handle form submits with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

// Database connection setup
let mongoDB = 'mongodb://admin:admin*123@ds263137.mlab.com:63137/hasangenc';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// routes
require('./routes/routes.js')(app); // load route

// launch app
app.listen(port, () => console.log(`App running on http://localhost:${port}`));

// catch 404
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

// catch 500
app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});

exports = module.exports = app;