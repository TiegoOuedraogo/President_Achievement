let wordList = [
    { word: "eat", hint: "To put food into the mouth and chew and swallow it" },
    { word: "mistake", hint: "An action or judgment that is misguided or wrong" },
    { word: "ocean", hint: "A vast body of salt water that covers almost three-quarters of the earth's surface" },
    { word: "mountain", hint: "A large natural elevation of the earth's surface rising abruptly from the surrounding level" },
    { word: "desert", hint: "A barren area of landscape where little precipitation occurs" },
    { word: "forest", hint: "A large area covered chiefly with trees and undergrowth" },
    { word: "river", hint: "A large natural stream of water flowing in a channel to the sea, a lake, or another river" },
    { word: "volcano", hint: "A mountain or hill, typically conical, having a crater or vent through which lava is erupted" },
  ];

//   let currentWordIndex = 0;
//   let score = 0;
//   let gameOver = false;
//   let bonusReward = 0;
//   let bonusCounter = 0;

//   function displayHint() {
//     const hintDiv = document.getElementById("hint");
//     hintDiv.textContent = `Hint: ${wordList[currentWordIndex].hint}`;
//   }

//   function initializeGame() {
//     const answersDiv = document.getElementById("answers");
//     answersDiv.innerHTML = "";
//     currentWordIndex = 0;
//     score = 0;
//     gameOver = false;
//     bonusReward = 0;
//     bonusCounter = 0;
//     displayHint();
//     displayAnswers();
//     clearMessage();
//     updateScore();
//   }

//   function displayAnswers() {
//     const answersDiv = document.getElementById("answers");

//     if (currentWordIndex < 2) {
//         answersDiv.innerHTML = "";
//         for (let i = 0; i < 4; i++) {
//           const button = document.createElement("button");
//           button.textContent = "";
//           button.className = "placeholder";
//           answersDiv.appendChild(button);
//         }
//         const buttons = answersDiv.querySelectorAll(".placeholder");
//         buttons[currentWordIndex].textContent = getRandomWord();
//         buttons[currentWordIndex].addEventListener("click", () => process(buttons[currentWordIndex].textContent, wordList[currentWordIndex].word));
//       }
//       // Display placeholders for the remaining questions
//       else {
//         answersDiv.innerHTML = "";
//         for (let i = 0; i < 4; i++) {
//           const button = document.createElement("button");
//           button.textContent = "";
//           button.className = "placeholder";
//           answersDiv.appendChild(button);
//         }
//       }
//     answersDiv.innerHTML = "";

//     const currentWord = wordList[currentWordIndex].word;
//     const answers = getRandomAnswers(currentWord);

//     for (const answer of answers) {
//       const button = document.createElement("button");
//       button.textContent = answer;
//       button.addEventListener("click", () => process(answer, currentWord));
//       answersDiv.appendChild(button);
//     }
//   }

//   function getRandomAnswers(correctAnswer) {
//     const answers = [correctAnswer];
//     while (answers.length < 4) {
//       const randomWord = getRandomWord();
//       if (!answers.includes(randomWord)) {
//         answers.push(randomWord);
//       }
//     }
//     return shuffle(answers);
//   }

//   function getRandomWord() {
//     const randomIndex = Math.floor(Math.random() * wordList.length);
//     return wordList[randomIndex].word;
//   }

//   function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

//   function process(userGuess, correctAnswer) {
//     if (gameOver) return;

//     if (userGuess === correctAnswer) {
//       score++;
//       if (bonusCounter < 2) {
//         bonusCounter++;
//       } else {
//         score += bonusReward;
//       }
//       updateScore();
//       winningHandle();
//     } else {
//       score--;
//       updateScore();
//       losingHandle();
//       if (score === 0) {
//         gameOver = true;
//         displayMessage("Game Over. Your score reached zero.");
//       }
//     }

//     currentWordIndex++;
//     if (currentWordIndex < wordList.length && !gameOver) {
//       displayHint();
//       displayAnswers();
//     } else if (!gameOver) {
//       clearGrid();
//       displayMessage(`Congratulations! You've completed the game. Bonus Reward: ${bonusReward}`);
//     }
//   }

//   function clearGrid() {
//     const answersDiv = document.getElementById("answers");
//     answersDiv.innerHTML = "";
//   }

//   function displayMessage(message) {
//     const messageDiv = document.getElementById("message");
//     messageDiv.textContent = message;
//   }

//   function clearMessage() {
//     const messageDiv = document.getElementById("message");
//     messageDiv.textContent = "";
//   }

//   function winningHandle() {
//     displayMessage("Correct! You guessed it right.");
//   }

//   function losingHandle() {
//     displayMessage("Incorrect! Try again.");
//   }

//   function updateScore() {
//     const scoreDiv = document.getElementById("score");
//     scoreDiv.textContent = `Score: ${score}`;
//   }


let currentWordIndex = 0;
let score = 0;
let isGameOver = false;
let bonusAwarded = false;
let currentWord = {};

function displayMessage(message) {
    document.getElementById('message').textContent = message;
}

function displayHint() {
    let hint = wordList[currentWordIndex].hint;
    document.getElementById('hint').textContent = 'Hint: ' + hint;
}
function displayWordOptions() {
    let correctWord = currentWord.word;
    let options = generateWordOptions(correctWord, wordList);
    for (let i = 1; i <= options.length; i++) {
        document.getElementById('word' + i).textContent = options[i];
    }
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function generateWordOptions(correctWord, wordList) {
    let options = new Set([correctWord]);

    while (options.size < 4) {
        let randomWord = wordList[Math.floor(Math.random() * wordList.length)].word;
        options.add(randomWord);
    }

    return shuffle(Array.from(options));
}

function processGuess(userGuess) {
    if (isGameOver) {
        displayMessage("Game Over! Please restart the game.");
        return;
    }

    if (userGuess.toLowerCase() === currentWord.word.toLowerCase()) {
        handleCorrectAnswer();
    } else {
        score--;
        displayMessage("Incorrect. Try again!");
    }
    
    updateScoreDisplay();
    checkGameStatus();
    moveToNextWord();
}

function handleCorrectAnswer() {
    score++;
    if (currentWordIndex < 2 && !bonusAwarded) {
        let bonus = Math.floor(Math.random() * 20) + 1;
        score += bonus;
        displayMessage(`Correct! You got a bonus of ${bonus} points.`);
        bonusAwarded = true;
    } else {
        displayMessage("Correct!");
    }
}

function moveToNextWord() {
    currentWordIndex++;
    if (currentWordIndex < wordList.length) {
        currentWord = wordList[currentWordIndex];
        displayHint();
        displayWordOptions();
    } else {
        isGameOver = true;
        handleWinCondition();
    }
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
}

function checkGameStatus() {
    if (score <= 0) {
        isGameOver = true;
        handleGameOverCondition();
    }
}

function handleGameOverCondition() {
    displayMessage("Game Over! Your final score is " + score + ".");
}

function handleWinCondition() {
    displayMessage("Congratulations! You've guessed all words!");
}

function restartGame() {
    currentWordIndex = 0;
    score = 0;
    isGameOver = false;
    bonusAwarded = false;
    currentWord = wordList[currentWordIndex];
    displayHint();
    updateScoreDisplay();
}

document.getElementById('submitGuess').addEventListener('click', function() {
    let guess = document.getElementById('guessInput').value;
    processGuess(guess);
    document.getElementById('guessInput').value = '';
});

document.getElementById('restartGame').addEventListener('click', restartGame);

initializeGame();

function initializeGame() {
    currentWordIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[currentWordIndex];
    displayHint();
    updateScoreDisplay();
}
