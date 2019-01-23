const Session = require("../models/session");

let ViewAsScrumMaster = (req, res) => {

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