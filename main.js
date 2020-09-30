// define variables
var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (questions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
var userInitialsInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;

// initiate timer on click "Start" -> switch btwn "home" & "quiz" using Bootstrap class 'd-none'
function startTimer() {

    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    // set/reset timer to 90 seconds on click
    setTimer();
    // initiate questions on click
    makeQuestions();
}

function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        // timer expires at 500 secs, defaults to "finished screen" for score & user input
        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

// pulls titles from question array in questions.js 
function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    // pulls 'choices' array from questions.js, assign btn and attr for "i", create btn click event to continue to next question
    var choices = questions[questionNumber].choices;

    for (var i = 0; i < choices.length; i++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[i]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

// quiz complete - display score and user initials input
// d-none used instead of show/hide when element is selected
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
}

// click event start/submit.... adds score to local highscore string
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './highscore.html'
});

function addScore () {
    userInitialsInput = document.getElementById("userInitials").value
    
    // create a new score object associated with userInitials
var newScore = {
        name: userInitialsInput,
        score: secondsLeft
    };
    // check if there are scores in local storage first(get it)
    //if not, make a new/blank array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // adds new score to the end of the array, and returns the new length.
    highScores.push(newScore)
    // convert to string array
    localStorage.setItem("highScores", JSON.stringify(highScores));

}

// hide result message
function hideResults(){
    var pEl= document.getElementsByClassName("results")[0]
    pEl.style.display='none'
}

// show result message on choice selection (i.e. correct, incorrect)
function showResults(){
    var pEl= document.getElementsByClassName("results")[0]
    pEl.removeAttribute('style');
}

// 
answerChoices.addEventListener("click", function (event) {
    var pEl= document.getElementsByClassName("results")[0]
    
    // evaluates choices & returns a "result" (i.e. correct, incorrect)
    if (answer === event.target.textContent) {   
        pEl.innerHTML = "There you go!";
        setTimeout(hideResults,1000);
        showResults();   
    } 
    // innerHTML property sets/returns the HTML content of an element
    else {
        pEl.innerHTML = "Oops! There goes 10 seconds!";
        setTimeout(hideResults,1000);
        secondsLeft = secondsLeft - 10;
        showResults();
    }    
    makeQuestions();
});
