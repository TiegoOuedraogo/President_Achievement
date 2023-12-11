let wordList = [
  {
    "word": "George Washington",
    "hint": "Led the American Revolutionary War and became the first President of the United States."
  },
  {
    "word": "Thomas Jefferson",
    "hint": "Authored the Declaration of Independence and facilitated the Louisiana Purchase."
  },
  {
    "word": "Abraham Lincoln",
    "hint": "Preserved the Union during the Civil War and emancipated the slaves with the Emancipation Proclamation."
  },
  {
    "word": "Franklin D. Roosevelt",
    "hint": "Led the United States through the Great Depression and World War II, introducing the New Deal."
  },
  {
    "word": "John F. Kennedy",
    "hint": "Famous for the Space Race and establishing the Peace Corps."
  },
  {
    "word": "Lyndon B. Johnson",
    "hint": "Significant for his 'Great Society' social service programs and the Civil Rights Act."
  },
  {
    "word": "Ronald Reagan",
    "hint": "Known for Reaganomics and ending the Cold War."
  },
  {
    "word": "Barack Obama",
    "hint": "First African American president, known for the Affordable Care Act."
  },
  {
    "word": "Jimmy Carter",
    "hint": "Noted for his role in the Camp David Accords and post-presidency humanitarian work."
  },
  {
    "word": "Bill Clinton",
    "hint": "Presided over the longest period of peacetime economic expansion."
  },
  {
    "word": "Richard Nixon",
    "hint": "Opened diplomatic relations with China but resigned due to the Watergate scandal."
  },
  {
    "word": "Dwight D. Eisenhower",
    "hint": "Led the Allied Forces in World War II and initiated the Interstate Highway System."
  },
  {
    "word": "John Adams",
    "hint": "A key figure in the American Revolution and the second President of the United States."
  },
  {
    "word": "Woodrow Wilson",
    "hint": "Created the League of Nations and won the Nobel Peace Prize."
  },
  {
    "word": "Theodore Roosevelt",
    "hint": "Known for his 'Big Stick' diplomacy and the Panama Canal."
  },
  {
    "word": "Harry S. Truman",
    "hint": "Ended World War II by ordering the use of atomic bombs and initiated the Marshall Plan."
  },
  {
    "word": "George W. Bush",
    "hint": "Led the country during the 9/11 attacks and initiated the Iraq War."
  },
  {
    "word": "Andrew Jackson",
    "hint": "Known for his role in the Indian Removal Act and founder of the Democratic Party."
  },
  {
    "word": "Thomas Jefferson",
    "hint": "Commissioned the Lewis and Clark Expedition."
  },
  {
    "word": "Franklin D. Roosevelt",
    "hint": "Established the Social Security Act."
  },
  {
    "word": "Theodore Roosevelt",
    "hint": "Known for his conservation efforts and the establishment of National Parks."
  },
  {
    "word": "Herbert Hoover",
    "hint": "Led major relief efforts in Europe during and after World War I."
  },
  {
    "word": "James K. Polk",
    "hint": "Significant for the expansion of the U.S. territory through the Mexican-American War."
  },
  {
    "word": "Thomas Jefferson",
    "hint": "Founder of the University of Virginia."
  },
  {
    "word": "William McKinley",
    "hint": "Led the nation to victory in the Spanish-American War and supported the Gold Standard Act."
  },
  {
    "word": "John F. Kennedy",
    "hint": "Initiated the Apollo program aiming to land a man on the moon."
  },
  {
    "word": "Gerald Ford",
    "hint": "Known for his controversial pardon of Richard Nixon."
  },
  {
    "word": "Calvin Coolidge",
    "hint": "Known for his laissez-faire approach to the booming economy of the 1920s."
  },
  {
    "word": "James Monroe",
    "hint": "Famous for the Monroe Doctrine, opposing European colonialism in the Americas."
  },
  {
    "word": "Ulysses S. Grant",
    "hint": "Led the Union Army to victory in the Civil War and supported Reconstruction."
  },
  {
    "word": "James Madison",
    "hint": "Father of the Constitution and the Bill of Rights."
  },
];

let currentWordIndex = 0;
let score = 0;
let isGameOver = false;
let bonusAwarded = false;
let currentWord = {};

function displayMessage(message) {
  document.getElementById("message").textContent = message;
}

function displayWordOptions() {
  currentWord = wordList[currentWordIndex]; // Ensure currentWord is set correctly
  let correctWord = currentWord.word;
  let options = generateWordOptions(correctWord, wordList);
  for (let i = 1; i <= options.length; i++) {
    document.getElementById("word" + i).textContent = options[i - 1];
  }
}

function processGuess(userGuess) {
  console.log("Processing guess:", userGuess);
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
  displayWordOptions();
}

document.getElementById("submitGuess").addEventListener("click", function () {
  let guess = document.getElementById("guessInput").value;
  processGuess(guess);
  document.getElementById("guessInput").value = "";
});

function generateWordOptions(correctWord, wordList) {
  let options = new Set([correctWord]);
  let tempWordList = [...wordList]; // Create a copy of wordList

  while (options.size < 5 && tempWordList.length > 0) {
    let randomIndex = Math.floor(Math.random() * tempWordList.length);
    let randomWord = tempWordList[randomIndex].word;

    options.add(randomWord);
    tempWordList.splice(randomIndex, 1); // Remove the selected word from the copy
  }

  return Array.from(options).sort(() => Math.random() - 0.5); // Shuffle the options
}

function displayHint() {
  let hint = wordList[currentWordIndex].hint;
  document.getElementById("hint").textContent = "Hint: " + hint;
  displayWordOptions();
}
function moveToNextWord() {
  console.log("Moving to next word, index before increment:", currentWordIndex); // Debugging
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
  updateScoreDisplay();
}

function updateScoreDisplay() {
  document.getElementById("score").textContent = score;
}

function checkGameStatus() {
  if (score <= 0) {
    isGameOver = true;
    handleGameOverCondition();
  }
}

function handleGameOverCondition() {
  displayMessage("Game Over! Your final score is " + score + ".");
  gameScoreSaved();
}

function handleWinCondition() {
  displayMessage("Congratulations! You've guessed all words!");
}

function gameScoreSaved() {
  localStorage.setItem("wordGameScore", score.toString());
  displayMessage("Your score has been saved.");
}

function restartGame() {
  score = 0;
  currentWordIndex = 0;
  isGameOver = false;
  updateScoreDisplay();
  displayHint();
}

function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

function initializeGame() {
  currentWordIndex = 0;
  currentWord = wordList[currentWordIndex];
  displayHint();
  displayWordOptions();
  updateScoreDisplay();
  bonusAwarded = false;
  isGameOver = false;
}

document.getElementById("restartGame").addEventListener("click", restartGame);

initializeGame();
