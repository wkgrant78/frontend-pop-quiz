// define variable
var startbtnEl = document.getElementById("start");
var submitbtnEl = document.getElementById("submit")
var timeLeftEl = (questions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitEl = document.getElementById("submit");
var finalScoreEl = document.getElementById("finalScore");
var questionEl = document.getElementById("questions");
var choicesEl = document.getElementById("answers");

var userName;

var questionNumber = -1;
var answer;

// start quiz/timer on click
function startQuiz() {
    document.getElementById("home").classList.add('d-none');
    document.getElementById("question-container").classList.remove('d-none');

    // set timer to start at 90 seconds
    setTimer();
    // get questions to populate
    makeQuestions();
}
// setTimer is a function passed as a parameter to another function in order to be called later
function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textcontent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(showScore, 500);
        }
    }, 1000);
}

// build quiz questions
function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionEl.textContent = questions[questionNumber].title;
    choicesEl.innerHTML = "";

    var options = questions[questionNumber].options;

    for (var q = 0; q < options.length; q++) {
        var next = document.createElement("button");

        next.textContent = options[q]
        answerBtn = choicesEl.appendChild(next).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }

    // enter name at end of quiz and the final score
    function displayScore() {
        document.getElementById("start").classList.add('d-none');
        document.getElementById("submit").classList.remove('d-none');
        finalScoreEl.textContent = "Your final score is " + timeLeftEl;
    }

    // event listener for click
    startBtnEl.addEventListener("click", startQuiz);
    submitBtnEl.addEventListener("click", function (event) {
        event.stopPropagation();
        addScore();

        window.location.href = './highscores.html'
    });

    // add score to final page
    function addScore () {
        userName = document.getElementById("userName").value

        // name and score object
        var newScore = {
            name: userName,
            score: timeLeftEl 
        };

        // display locally stored scores
        var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
        highScores.push(newScore)
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    function hideResults(){
        var pEl= document.getElementsByClassName("results")[0]
        pEl.style.display='none'
    }
    
    function showResults(){
        var pEl= document.getElementsByClassName("results")[0]
        pEl.removeAttribute('style');
    }
    
    answerChoices.addEventListener("click", function (event) {
        var pEl= document.getElementsByClassName("results")[0]
    
        if (answer === event.target.textContent) {   
            pEl.innerHTML = "Correct!";
            setTimeout(hideResults,1000);
            showFeedback();   
        } else {
            pEl.innerHTML = "Sorry, that's incorrect.";
            setTimeout(hideResults,1000);
            secondsLeft = timeLeftEl - 10;
            showResults();
        }    
        makeQuestions();
    });
    
    }
