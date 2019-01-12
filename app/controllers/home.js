let home = (req, res) => {
	res.render('home.ejs', {
		session: req.session,
		title: "hasan"
	 });
}

module.exports = home;