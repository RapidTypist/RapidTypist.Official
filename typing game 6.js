const car = document.getElementById("car");
const wordDisplay = document.getElementById("word");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");
const timerDisplay = document.getElementById("timer");

let words = ["speed", "drive", "racer", "track", "winner", "boost", "fast"];
let currentWord = "";
let typedWord = "";
let score = 0;
let position = 0;
let gameActive = true;
let timeLeft = 15; // Timer starts at 30 seconds
let timerInterval;

/* Function to Get a Random Word */
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

/* Function to Start New Round */
function newRound() {
    if (gameActive) {
        currentWord = getRandomWord();
        typedWord = "";
        wordDisplay.textContent = currentWord;
    }
}

/* Detect Correct Typing */
document.addEventListener("keydown", function (event) {
    if (!gameActive) return;

    typedWord += event.key.toLowerCase();

    if (currentWord.startsWith(typedWord)) {
        wordDisplay.textContent = currentWord.slice(typedWord.length);

        if (typedWord === currentWord) {
            moveCar();
            score++;
            scoreDisplay.textContent = score;
            newRound();
        }
    } else {
        typedWord = "";
        wordDisplay.textContent = currentWord;
    }
});

/* Function to Move the Car */
function moveCar() {
    position += 50; // Move car forward
    car.style.left = position + "px";

    if (position >= 400) {
        endGame(); // Game Over if car reaches end
    }
}

/* Function to Update Timer */
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            endGame(); // If timer reaches 0, game over
        }
    }, 1000);
}

/* Function to End the Game */
function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = "block";
}

/* Restart Game */
restartButton.addEventListener("click", function () {
    gameActive = true;
    score = 0;
    position = 0;
    timeLeft = 15;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameOverScreen.style.display = "none";
    car.style.left = "0px";
    newRound();
    startTimer();
});

/* Start First Round */
newRound();
startTimer();
