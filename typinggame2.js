const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

let score = 0;
let gameActive = true; // Game state
let fallSpeed = 1.5; // Slower start speed
let spawnRate = 2000; // How often letters appear
let gameInterval = null; // Store the interval
let difficultyInterval = null; // Store the difficulty interval

/* Function to get a random letter */
function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

/* Function to create falling letters */
function createFallingLetter() {
    if (!gameActive) return;

    const letter = document.createElement("div");
    letter.classList.add("letter");
    letter.textContent = getRandomLetter();
    letter.style.left = `${Math.random() * 80}%`;
    gameContainer.appendChild(letter);

    let position = 0;
    let speed = fallSpeed;

    function moveLetter() {
        if (!gameActive) return; // Stop moving letters when game ends

        if (position < gameContainer.clientHeight - 40) {
            position += speed;
            letter.style.top = position + "px";
            requestAnimationFrame(moveLetter);
        } else {
            if (document.body.contains(letter)) {
                endGame(); // Game over when a letter touches the ground
            }
        }
    }

    moveLetter();
}

/* Function to gradually increase difficulty */
function increaseDifficulty() {
    if (!gameActive) return;
    
    if (fallSpeed < 6) fallSpeed += 0.2;
    if (spawnRate > 800) spawnRate -= 100;
    
    restartGameLoop(); // Restart interval with new difficulty
}

/* Function to end the game */
function endGame() {
    gameActive = false;
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = "block";
    clearInterval(gameInterval);
    clearInterval(difficultyInterval);
}

/* Function to restart the game loop */
function restartGameLoop() {
    clearInterval(gameInterval);
    gameInterval = setInterval(createFallingLetter, spawnRate);
}

/* Start game loop */
gameInterval = setInterval(createFallingLetter, spawnRate);
difficultyInterval = setInterval(increaseDifficulty, 10000);

/* Detect and remove correct letters */
document.addEventListener("keydown", function (event) {
    if (!gameActive) return;
    
    const letters = document.querySelectorAll(".letter");
    letters.forEach((letter) => {
        if (letter.textContent.toLowerCase() === event.key.toLowerCase()) {
            letter.remove();
            score++;
            scoreDisplay.textContent = score;
        }
    });
});

/* Restart Game */
restartButton.addEventListener("click", function () {
    gameActive = true;
    score = 0;
    fallSpeed = 1.5; // Reset speed to slow at restart
    spawnRate = 2000;

    scoreDisplay.textContent = score;
    gameOverScreen.style.display = "none";

    // Remove all letters from the screen before restarting
    document.querySelectorAll(".letter").forEach(letter => letter.remove());

    restartGameLoop(); // Restart the game loop
    difficultyInterval = setInterval(increaseDifficulty, 10000);
});
