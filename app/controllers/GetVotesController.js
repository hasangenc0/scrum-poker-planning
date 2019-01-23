const Session = require("../models/session");

let getVotes = async (req, res) => {

  let name = req.params.session;

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