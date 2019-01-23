const Session = require("../models/session");

let FinalizeStory = (req, res) => {
  console.log("finalize: ");
  body = JSON.parse(req.params.body);

  // if sessionname already taken throw error in view
  Session.find({ name: body.session }, (err, votes) => {

    if (Array.isArray(votes) && votes.length) {
      // array exist, is an array, or is not empty
      let document = votes[0];

      for (let i = 0; i < document.story_list.length ; i++) {
        if (document.story_list[i] === body.active_story) {

          document.final_story[i] = body.final_score;

          break;
        }
      }

      for (let i = 0; i < document.session.length ; i++) {
        for (let j = 0; j < document.session[i].length ; j++) {
          if (document.session[i][j].name === body.active_story) {
            document.session[i][j].point = body.final_score;
          }
        }
      }

      Session.updateOne({ _id: document._id }, document, function(err) {
        if(err) { throw err; }
        console.log("finalized");
      });

      res.send(body.final_score);
    }
  });
  return;
}

module.exports = FinalizeStory;