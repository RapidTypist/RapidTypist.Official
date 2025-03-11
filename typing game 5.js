const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const playerHealthBar = document.getElementById("player-health");
const enemyHealthBar = document.getElementById("enemy-health");
const gameOverScreen = document.getElementById("game-over");
const gameMessage = document.getElementById("game-message");
const restartButton = document.getElementById("restart-btn");

let words = ["sword", "battle", "warrior", "attack", "shield", "power", "fight", "defend", "hero", "enemy"];
let playerHealth = 100;
let enemyHealth = 100;
let currentWord = "";
let enemyAttackInterval;

// Function to get a random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Function to update UI with a new word
function setNewWord() {
    currentWord = getRandomWord();
    wordDisplay.textContent = "Type this word: " + currentWord;
    wordInput.value = ""; // Clear input field
    wordInput.focus(); // Ensure focus stays on input
}

// Function to reset the enemy attack timer
function resetEnemyAttack() {
    clearInterval(enemyAttackInterval);
    enemyAttackInterval = setInterval(() => {
        playerHealth -= 10;
        playerHealthBar.style.width = playerHealth + "%";

        if (playerHealth <= 0) {
            endGame("☠️ Game Over! You were defeated.");
        }
    }, 5000); // Enemy attacks every 5 seconds
}

// Function to check if typed word is correct
wordInput.addEventListener("input", function () {
    if (wordInput.value.toLowerCase().trim() === currentWord.toLowerCase()) {
        enemyHealth -= 10; // Enemy loses health
        enemyHealthBar.style.width = enemyHealth + "%";

        if (enemyHealth <= 0) {
            endGame("🏆 You Won! The enemy is defeated.");
            return;
        }

        setNewWord(); // Load a new word
        resetEnemyAttack(); // Reset enemy attack timer
    }
});

// Function to end the game
function endGame(message) {
    gameOverScreen.style.display = "block";
    gameMessage.textContent = message;
    wordInput.disabled = true;
    clearInterval(enemyAttackInterval);
}

// Restart Game
restartButton.addEventListener("click", function () {
    gameOverScreen.style.display = "none";
    playerHealth = 100;
    enemyHealth = 100;
    playerHealthBar.style.width = "100%";
    enemyHealthBar.style.width = "100%";
    wordInput.disabled = false;
    setNewWord();
    resetEnemyAttack();
});

// Start Game
setNewWord();
resetEnemyAttack();
