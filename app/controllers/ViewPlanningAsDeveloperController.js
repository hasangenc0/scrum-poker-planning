const Session = require("../models/session");

let ViewAsDeveloper = (req, res) => {

	// zero is scrum master, developer numbers strat from 1
	if (req.params.voter === '0') {
		res.redirect('/poker-planning-view-as-scrum-master/' + req.params.session); // Redirects viewAsScrumMaster Page
		return;
	}

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
		// if developer with this number does not exist
		if (req.params.voter > session[0].voter_number) {
			res.redirect('/poker-planning-view-as-scrum-master/' + req.params.session); // Redirects viewAsScrumMaster Page
			return;
		}

		console.log(session);
		res.render('viewAsDeveloper', {
			session: session[0],
			voter: req.params.voter,
			title: "View Planning As Developer"
		});
	});
}

module.exports = ViewAsDeveloper;