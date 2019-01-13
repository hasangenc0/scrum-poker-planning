let addStoryList = (req, res) => {
	res.render('addStoryList', {
		session: req.session,
		title: "Add Story List"
	 });
}

module.exports = addStoryList;