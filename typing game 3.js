const sentenceDisplay = document.getElementById("sentence");
const userInput = document.getElementById("user-input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing games help improve your speed and accuracy.",
    "Fast typing is a useful skill in the digital age.",
    "Practice makes perfect, keep typing every day!"
];

let currentSentence = "";
let startTime;
let timer;
let isPlaying = false;

function startGame() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceDisplay.textContent = currentSentence;
    userInput.value = "";
    userInput.disabled = false;
    userInput.focus();
    
    timerDisplay.textContent = "0";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    
    isPlaying = false;
}

userInput.addEventListener("input", function () {
    if (!isPlaying) {
        isPlaying = true;
        startTime = new Date();
        timer = setInterval(updateTimer, 100);
    }

    const userText = userInput.value;
    const correctText = currentSentence.substring(0, userText.length);

    if (userText === currentSentence) {
        endGame();
    }

    let correctChars = 0;
    for (let i = 0; i < userText.length; i++) {
        if (userText[i] === correctText[i]) correctChars++;
    }

    let accuracy = (correctChars / userText.length) * 100 || 100;
    accuracyDisplay.textContent = Math.round(accuracy);
});

function updateTimer() {
    let elapsedTime = (new Date() - startTime) / 1000;
    timerDisplay.textContent = elapsedTime.toFixed(1);
    
    let wordsTyped = userInput.value.length / 5;
    let wpm = (wordsTyped / (elapsedTime / 60)).toFixed(1);
    wpmDisplay.textContent = wpm;
}

function endGame() {
    clearInterval(timer);
    userInput.disabled = true;
}

restartBtn.addEventListener("click", startGame);

startGame();





document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
