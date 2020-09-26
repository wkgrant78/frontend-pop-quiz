// define variable
var startbtnEl = document.getElementById("start");
var submitbtnEl = document.getElementById("submit")
var timeLeftEl =(questions.length * 15 +1);
var timerEl = document.getElementById("timer");
var submitEl = document.getElementById("submit");
var finalScoreEl = document.getElementById("finalScore");
var questionEl = document.getElementById("questions");
var choicesEl = document.getElementById("answers");

var userName;

var questionNuber = -1;
var answer;

// start quiz on click
function startQuiz(){
    document.getElementById("home").classList.add('d-none');
    document.getElementById("question-container").classList.remove('d-none');

    // set timer to start at 90 seconds
    setTimer();
    // get questions to populate
    makeQuestions();
}


