var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    // JSON.parse converts data from web server to JS object
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList = document.getElementById("score-list");

    // sort scores 
    highScores.sort(function (a,b){
        return b.score - a.score
    })

    // display rank/userInitials/score
    for (var s = 0; s < highScores.length; s++) {
        var newLi = document.createElement("li")
        newLi.textContent = highScores[s].name + " - " + highScores[s].score
        scoreList.appendChild(newLi)
    }


// click event - 'try again' / 'clear score'
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back()
});
restartBtn.addEventListener("click", function () {
    history.back();
});
