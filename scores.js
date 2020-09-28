var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    // get the highScores list and turn it back into an object
    highScore = JSON.parse(localStorage.getItem("highScore") || "[]"),
    scoreList = document.getElementById("score-list");

    // sort scores from high to low
    highScore.sort(function (a,b){
        return b.score - a.score
    })

    // display the scores
    for (var s = 0; s < highScore.length; s++) {
        var newLi = document.createElement("li")
        newLi.textContent = highScore[s].name + " - " + highScore[s].score
        scoreList.appendChild(newLi)
    }


// click handlers for restart and clearing scoreboard
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back()
});
restartBtn.addEventListener("click", function () {
    history.back();
});
