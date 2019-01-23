const Session = require("../models/session");

let MakeVotes = async (req, res) => {
  console.log("hasan: ");
  console.log();
  let body = JSON.parse(req.params.body);

  // if sessionname already taken throw error in view
  Session.find({ name: body.name }, (err, votes) => {

    if (Array.isArray(votes) && votes.length) {
      // array exist, is an array, or is not empty
      let document = votes[0];

      for (let i = 0; i < document.session[parseInt(body.voter)].length ; i++) {
        if (document.session[parseInt(body.voter)][i].name === body.story) {
          document.session[parseInt(body.voter)][i].point = body.vote;

          Session.updateOne({ _id: document._id }, document, function(err) {
            if(err) { throw err; }
            console.log("updated");
          });

          break;
        }
      }

      res.json(document);
    }
      return;

  });

  // res.json(body);

  return;


}

module.exports = MakeVotes;