var home = require('../app/controllers/home');

module.exports = function (app) {
    // process the login form
    app.get('/', home);
}
