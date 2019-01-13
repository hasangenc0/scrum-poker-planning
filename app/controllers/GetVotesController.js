const Session = require("../models/session");
const mongoose = require('mongoose');

let getVotes = async (req, res) => {

  let name = req.params.session;

  // Database connection setup
  let mongoDB = 'mongodb://admin:admin*123@ds263137.mlab.com:63137/hasangenc';

  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;

  // if sessionname already taken throw error in view
  Session.find({ name: name }, (err, votes) => {

    if (Array.isArray(votes) && votes.length) {
      // array exist, is an array, or is not empty
      res.json(votes[0]);

      return;
    }

  });

  return;


}

module.exports = getVotes;