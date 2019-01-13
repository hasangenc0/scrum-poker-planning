const addStoryList = require('./AddStoryListController')
const addStoryListPost = require('./AddStoryListPostController')
const ViewPlanningAsDeveloper = require('./ViewPlanningAsDeveloperController')
const ViewPlanningAsScrumMaster = require('./ViewPlanningAsScrumMasterController')
const GetVotes = require('./GetVotesController')
const MakeVotes = require('./MakeVotesController')
const FinalizeStory = require('./FinalizeStoryController')

module.exports = {
  addStoryList: addStoryList,
  addStoryListPost: addStoryListPost,
  viewPlanningAsScrumMaster: ViewPlanningAsScrumMaster,
  viewPlanningAsDeveloper: ViewPlanningAsDeveloper,
  getVotes : GetVotes,
  makeVotes: MakeVotes,
  finalizeStory: FinalizeStory
}