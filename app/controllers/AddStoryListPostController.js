const Session = require("../models/session");
const mongoose = require('mongoose');

let addStoryListPost = async (req, res) => {
  console.log("hasan: ");
  console.log(req.body);

  let isEmpty = (val) => {
    return !(/([^\s])/.test(val));
  }

  let isNumAndPositive = (val) => {
    return /^(|[1-9]\d*)$/.test(val) && !isEmpty(val);
  }

  let isOutOfRange = (val) => {
    return (/^[a-z]{0,200}$/.test(val));
  }

  let isValid = false;

  let session_name = req.body.session_name;
  let voters_num = req.body.voters_num;
  let story_list = req.body.story_list;

  isValid = !(isEmpty(session_name) || isOutOfRange(session_name) || !isNumAndPositive(voters_num) || isEmpty(story_list));

  // if form not valid then return addStoryList page with error
  if (!isValid) {
    res.render('addStoryList', {
      error: true,
      title: "Add Story List"
    });
    return false;
  }

  // get stories line by line
  story_list = story_list.split("\r\n");
  console.log(story_list);

  // define sessions for all voters and pass point null for initial
  let voter_story = new Array(story_list.length).fill().map( (el, index) => {
    return {name: story_list[index], point: ''};
  });

  let session_vars = new Array(parseInt(voters_num)).fill(voter_story);

  // finally define our session scheme
  scheme = {
    name: session_name,
    voter_number: voters_num,
    story_list: story_list,
    session: session_vars,
    final_story: new Array(story_list.length).fill(null)
  }

  // Database connection setup
  let mongoDB = 'mongodb://admin:admin*123@ds263137.mlab.com:63137/hasangenc';

  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;

  // if sessionname already taken throw error in view
  Session.find({ name: scheme.name }, (err, session) => {

    if (Array.isArray(session) && session.length) {
      // array exist, is an array, or is not empty
      res.render('addStoryList', {
        error: true,
        error_message: 'Session Name Already Taken',
        title: "Add Story List"
      });

      return;
    }

    // save model to database
    var session1 = new Session(scheme);
    session1.save( (err, book) => {
      if (err) return console.error(err);
      console.log(scheme.name + " saved to scrum-poker collection.");
    });

    res.redirect('/poker-planning-view-as-scrum-master/' + session_name); // Redirects viewAsScrumMaster Page

  });

  return;


}

module.exports = addStoryListPost;