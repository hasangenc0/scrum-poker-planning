// handle with form submit event on AddStoryList Page
let handleSubmit = (() => {
  const form = document.getElementById('add-story-form');

  if (!form) // check if form exist on page
    return false;

  let isEmpty = (val) => {
    return !(/([^\s])/.test(val));
  }

  let isNumAndPositive = (val) => {
    return /^(|[1-9]\d*)$/.test(val) && !isEmpty(val);
  }

  let isOutOfRange = (val) => {
    return val.length > 200;
  }

  let submit = (event) => {
    event.preventDefault();

    let isValid = false;

    let session_name = document.getElementById('session_name');
    let voters_num = document.getElementById('voters_num');
    let story_list = document.getElementById('story_list');
    let session_name_error = document.getElementById('validate_session_name');
    let voters_num_error = document.getElementById('validate_voters_num');
    let story_list_error = document.getElementById('validate_story_list');

    isEmpty(session_name.value) ? session_name_error.innerText = 'Session Name can not be empty' : session_name_error.innerText = '';
    isOutOfRange(session_name.value) ? session_name_error.innerText = 'Session Name can not bigger than 200 chars' : '';
    isNumAndPositive(voters_num.value) ? voters_num_error.innerText = '' : voters_num_error.innerText = 'Voter number must be positive digit';
    isEmpty(story_list.value) ? story_list_error.innerText = 'Story list can not be empty' : story_list_error.innerText = '';

    isValid = !(isEmpty(session_name.value) || isOutOfRange(session_name.value) || !isNumAndPositive(voters_num.value) || isEmpty(story_list.value));

    if (isValid) {
      return form.submit();
    }

    return false;
  }

  form.addEventListener("submit", submit);

})();


// vote story
let vote = (() => {
  const list = document.getElementById('story_list');

  if (!list) // check if story list exist on page
    return false;

  let makeVote = (e) => {
    let el = e.currentTarget;

    let vote = el.innerHTML;
    let session = document.getElementById('session_name').innerHTML;
    let voter_id = document.getElementById('voter_id').innerHTML;
    let story_name = document.getElementById('selected_story_name').innerHTML;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let votes = JSON.parse(this.response);
        console.log(votes);

        let stories = document.getElementsByClassName('stories');

        for (let i = 0; i < stories.length; i++) {
          console.log();
          if (stories[i].childNodes[0].innerHTML === story_name) {
            stories[i].childNodes[1].innerHTML = vote;
            document.getElementById('isVoted').innerHTML = vote + ' voted';
            break;
          }
        }

      }
    };
    let body = {
      name: session,
      story: story_name,
      voter: voter_id,
      vote: vote
    }
    xhttp.open("GET", "/makevote/" + JSON.stringify(body), true);
    xhttp.send();
  }

  let getVotes = (e) => {
    let el = e.currentTarget;

    let story_name = el.childNodes[0].innerHTML;

    // get votes
    let session = document.getElementById('session_name').innerHTML;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let votes = JSON.parse(this.response);
        console.log(votes);

        // change the state of story list
        let voter_id = document.getElementById('voter_id').innerHTML;

        let stories = document.getElementsByClassName('stories');
        let story_states = votes.session[parseInt(voter_id)];

        for (let i = 0; i < stories.length; i++) {
          if (story_states[i].point === "") {
            stories[i].childNodes[2].innerHTML = 'Not Voted';
          } else {
            stories[i].childNodes[2].innerHTML = 'Voted';
            stories[i].childNodes[1].innerHTML = story_states[i].point;
          }
        }

        el.childNodes[2].innerHTML = 'Active';
        if (el.childNodes[1].innerHTML === "") {
          document.getElementById('isVoted').innerHTML = 'Not Voted';
        } else {
          document.getElementById('isVoted').innerHTML = el.childNodes[1].innerHTML + ' voted';
        }

        document.getElementById('selected_story_name').innerHTML = story_name;

        panel_message = document.getElementById('panel_message');
        if(panel_message)
          panel_message.innerHTML = 'Active Story: ' + story_name;

      }
    };

    xhttp.open("GET", "/getvotes/" + session, true);
    xhttp.send();
  }

  let stories = document.getElementsByClassName('stories');
  let vote_counts = document.getElementsByClassName('vote_counts');

  for (let i = 0; i < stories.length; i++) {
    stories[i].addEventListener('click', getVotes, false);
  }

  for (let i = 0; i < vote_counts.length; i++) {
    vote_counts[i].addEventListener('click', makeVote, false);
  }

})();

// scrum master panel
let masterPanel = (() => {
  const panel = document.getElementById('master_panel');

  if (!panel) // check if story list exist on page
    return false;

  // get votes
  let checkVotes = () => {
    let session = document.getElementById('session_name').innerHTML;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let votes = JSON.parse(this.response);
        let active_story = document.getElementById('selected_story_name').innerHTML;

        if (!votes.story_list.includes(active_story)) {
          return;
        }

        let button = document.getElementById('end_voting');
        button.innerHTML = "End Voting For " + active_story;
        button.classList.remove("hidden");
        button.parentNode.childNodes[3].classList.remove("hidden");

        for (let i = 1; i < votes.session.length; i++) {
          for (let j = 0; j < votes.session[i].length; j++) {
            if(votes.session[i][j].name === active_story) {
              document.getElementsByClassName('voters_info')[i-1].childNodes[1].innerHTML = votes.session[i][j].point;
              document.getElementById('master_vote').innerHTML = votes.session[0][j].point;
            }
          }
        }
      }
    };
    xhttp.open("GET", "/getvotes/" + session, true);
    xhttp.send();
  }

  setInterval(checkVotes, 2000);

  // scrum master can finalize to story
  let finalizeStory = () => {

    let session = document.getElementById('session_name').innerHTML;
    let active_story = document.getElementById('selected_story_name').innerHTML;
    let final_score = document.getElementById('final_score').value;
    document.getElementById('final_score').classList.remove("hidden");

    // if there is not a final score value
    if(final_score === "")
      return;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange =  () => {

      let stories = document.getElementsByClassName('stories');

      for (let i = 0; i < stories.length; i++) {
        if(stories[i].childNodes[0].innerHTML == active_story) {
          stories[i].click();
        }
      }
    };

    body = {
      session: session,
      active_story: active_story,
      final_score: final_score,
    };

    xhttp.open("GET", "/finalize/" + JSON.stringify(body), true);
    xhttp.send();
  }


  let button = document.getElementById('end_voting');
  button.addEventListener("click", finalizeStory);
})();