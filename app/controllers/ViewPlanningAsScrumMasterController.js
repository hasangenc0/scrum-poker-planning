const Session = require("../models/session");
const mongoose = require('mongoose');

let ViewAsScrumMaster = (req, res) => {

	// Database connection setup
	let mongoDB = 'mongodb://admin:admin*123@ds263137.mlab.com:63137/hasangenc';

	mongoose.connect(mongoDB, { useNewUrlParser: true });
	mongoose.Promise = global.Promise;

	// if session name already taken then throw error in view
	Session.find({ name: req.params.session }, (err, session) => {

		if (!Array.isArray(session) || !session.length) {
			// array does not exist, is not an array, or is empty
			res.render('viewAsScrumMaster', {
				error: true,
				error_message: 'Session not found please create a new one from Add Story List button above.',
				title: "Add Story List"
			});

			return;
		}
		console.log(session);
		res.render('viewAsScrumMaster', {
			session: session[0],
			title: "View Planning As Scrum Master"
		});
	});
}

module.exports = ViewAsScrumMaster;