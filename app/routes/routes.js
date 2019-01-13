const controllers = require('../controllers/Controllers')

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.redirect('/poker-planning-add-story-list'); // Redirects index page to addStoryList
    });

    app.get('/poker-planning-add-story-list', controllers.addStoryList);
    app.post('/poker-planning-add-story-list', controllers.addStoryListPost);

    app.get('/poker-planning-view-as-developer/:voter/:session', controllers.viewPlanningAsDeveloper);

    app.get('/poker-planning-view-as-scrum-master/:session', controllers.viewPlanningAsScrumMaster);

    app.get('/getvotes/:session', controllers.getVotes);
    app.get('/makevote/:body', controllers.makeVotes);

    app.get('/finalize/:body', controllers.finalizeStory);

    app.get('/favicon.ico', (req, res) => {
        res.setHeader('Content-Type', 'image/png');
        res.sendFile(__dirname + '/favicon.ico');
    });
}
