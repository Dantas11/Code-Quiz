var timecounter = document.getElementById("timecounter");
var timer = document.getElementById("timer");
var info = document.getElementById("info");
var btnStart = document.getElementById("btn-start");

var quizQuestions = document.getElementById("quiz-questions");
var questionTitle = document.getElementById("question-title");
var questionanswers = document.getElementById("question-answers");

var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var alert = document.getElementById("alert");

var nextQuestions;
var currentindex = 0;
var score = 0;
var count = 75;

var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));



btnStart.addEventListener("click", starQuiz);
function starQuiz() {
    if (storedScores !== null) {
        allScores = storedScores;
    }
    btnstart_tittle.classList.add("hide");
    info.classList.add("hide");
    btnStart.classList.add("hide");
    quizQuestions.classList.remove("hide");
    nextQuestions = questions[currentindex];
    console.log(nextQuestions.title);

    displayQuestion(nextQuestions);

    gametime();
}

btnScore.addEventListener("click", function () {
    let name = document.getElementById("inputScore").value;
    scorePage(name, count);
});

function gametime() {
    var timeinterval = setInterval(function () {
        timer.innerText = count;
        count--;
        if (count === 0) {
            endgame();
            clearInterval(timeinterval); 
        }
        if (currentindex >= questions.length) {
            endgame();
            clearInterval(timeinterval);
        }
    }, 1000);
}

function scorePage(a, b) {
    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}

function displayQuestion(question) {
    questionTitle.innerText = question.title;
    question.choices.forEach(element => {
        var button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = element;
        questionanswers.appendChild(button);
        button.addEventListener("click", displaynextQuestion);
    });
}

function displaynextQuestion(e) {
    currentindex++;
    if (currentindex < questions.length) {
        correction(e.target.innerText == nextQuestions.answer);
        questionanswers.innerHTML = "";
        if (currentindex < questions.length) {
            nextQuestions = questions[currentindex];
            displayQuestion(nextQuestions);
        } else {
            currentindex = 0;
            displayQuestion(nextQuestions);
        }
    } else {
        console.log("endgame");
        endgame();
    }
}

function correction(response) {
    if (response) {
        alert.innerText = "Good!";
        console.log("Good!");
    } else {
        alert.innerText = "Wrong!";
        count = count - 15;
        timer.innerHTML = count;
        console.log("Wrong!");
    }
    setTimeout(function () {
        alert.innerText = "";
    }, 1000);
}

function endgame() {
    document.getElementById("final-score").textContent = count;
    addscore.classList.remove("hide");
    timecounter.classList.add("hide");
    quizQuestions.classList.add("hide");
    addscore.classList.remove("hide");
}
