const keyDisplay = document.getElementById("key-display");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let timeLeft = 3;
let gameActive = true;
let countdown;

function getRandomKey() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

function startGame() {
    score = 0;
    timeLeft = 3;
    gameActive = true;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    generateNewKey();
    startTimer();
}

function generateNewKey() {
    keyDisplay.textContent = getRandomKey();
    keyDisplay.style.transform = "scale(1.2)";
    setTimeout(() => {
        keyDisplay.style.transform = "scale(1)";
    }, 100);
}

function startTimer() {
    clearInterval(countdown);
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
        } else {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(countdown);
    keyDisplay.textContent = "❌";
}

document.addEventListener("keydown", (event) => {
    if (!gameActive) return;

    if (event.key.toUpperCase() === keyDisplay.textContent) {
        score++;
        scoreDisplay.textContent = score;
        timeLeft = 3; // Reset timer on correct key press
        generateNewKey();
    }
});

restartBtn.addEventListener("click", startGame);

startGame();
