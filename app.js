const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

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