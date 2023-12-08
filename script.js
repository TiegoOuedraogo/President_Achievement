let wordList = [
    {
      word: "wonderful",
      hint: "An adjective describing something inspiring delight",
    },
    { word: "apple", hint: "A common fruit known for its round shape" },
    { word: "classroom", hint: "A room where lessons are taught" },
    { word: "rude boy", hint: "A term originating from Jamaican street culture" },
    { word: "happy", hint: "A feeling of joy or pleasure" },
    {
      word: "forgiveness",
      hint: "The action of pardoning someone for a mistake or wrongdoing",
    },
    { word: "college", hint: "An educational institution or establishment" },
    {
      word: "fired",
      hint: "Losing one's job; often used in the phrase 'You're ___'",
    },
    {
      word: "world",
      hint: "The earth, together with all of its countries and peoples",
    },
    {
      word: "space",
      hint: "A vast, seemingly infinite area beyond Earth's atmosphere",
    },
    { word: "clown", hint: "A comic entertainer, especially one in a circus" },
    { word: "love", hint: "An intense feeling of deep affection" },
    { word: "eat", hint: "To put food into the mouth and chew and swallow it" },
    { word: "mistake", hint: "An action or judgment that is misguided or wrong" },
    {
      word: "ocean",
      hint: "A vast body of salt water that covers almost three-quarters of the earth's surface",
    },
    {
      word: "mountain",
      hint: "A large natural elevation of the earth's surface rising abruptly from the surrounding level",
    },
    {
      word: "desert",
      hint: "A barren area of landscape where little precipitation occurs",
    },
    {
      word: "forest",
      hint: "A large area covered chiefly with trees and undergrowth",
    },
    {
      word: "river",
      hint: "A large natural stream of water flowing in a channel to the sea, a lake, or another river",
    },
    {
      word: "volcano",
      hint: "A mountain or hill, typically conical, having a crater or vent through which lava is erupted",
    },
    { word: "island", hint: "A piece of land surrounded by water" },
    {
      word: "glacier",
      hint: "A slowly moving mass or river of ice formed by the accumulation and compaction of snow",
    },
    {
      word: "jungle",
      hint: "Land covered with dense vegetation dominated by trees",
    },
    { word: "city", hint: "A large town" },
    {
      word: "village",
      hint: "A group of houses and associated buildings, smaller than a town",
    },
    {
      word: "eclipse",
      hint: "An event in which the shadow of one celestial body falls on another",
    },
    {
      word: "galaxy",
      hint: "A system of millions or billions of stars, together with gas and dust, held together by gravitational attraction",
    },
    {
      word: "universe",
      hint: "All existing matter and space considered as a whole",
    },
    {
      word: "nature",
      hint: "The phenomena of the physical world collectively, including plants, animals, and the landscape",
    },
    {
      word: "animal",
      hint: "A living organism that feeds on organic matter, typically having specialized sense organs and nervous system",
    },
    {
      word: "mammal",
      hint: "A warm-blooded vertebrate animal distinguished by the possession of hair or fur",
    },
    {
      word: "reptile",
      hint: "A cold-blooded vertebrate of a class that includes snakes, lizards, crocodiles, and turtles",
    },
    {
      word: "insect",
      hint: "A small arthropod animal that has six legs and generally one or two pairs of wings",
    },
    {
      word: "bird",
      hint: "A warm-blooded egg-laying vertebrate distinguished by the possession of feathers, wings, and a beak",
    },
    {
      word: "puzzle",
      hint: "A game, toy, or problem designed to test ingenuity or knowledge",
    },
    {
      word: "guitar",
      hint: "A stringed musical instrument played with fingers or a plectrum",
    },
    {
      word: "bicycle",
      hint: "A vehicle with two wheels in tandem, propelled by pedals",
    },
    { word: "painting", hint: "A picture made with paint" },
    {
      word: "novel",
      hint: "A long written story usually about imaginary characters and events",
    },
    {
      word: "poetry",
      hint: "Literary work in which the expression of feelings and ideas is given intensity by the use of distinctive style and rhythm",
    },
    {
      word: "science",
      hint: "The intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world",
    },
    {
      word: "robot",
      hint: "A machine capable of carrying out a complex series of actions automatically",
    },
    {
      word: "piano",
      hint: "A large keyboard musical instrument with a wooden case enclosing a soundboard and metal strings",
    },
    {
      word: "rocket",
      hint: "A cylindrical projectile that can be propelled to a great height or distance by the combustion of its contents",
    },
    {
      word: "jewelry",
      hint: "Personal ornaments, such as necklaces, rings, or bracelets, made from precious metals and stones",
    },
    {
      word: "camera",
      hint: "A device for recording visual images in the form of photographs, film, or video",
    },
    {
      word: "balloon",
      hint: "A flexible bag that can be inflated with a gas, such as helium, hydrogen, nitrous oxide, oxygen, or air",
    },
    {
      word: "festival",
      hint: "A day or period of celebration, typically for religious reasons",
    },
    {
      word: "mirror",
      hint: "A reflective surface, now typically of glass coated with a metal amalgam, that reflects a clear image",
    },
    {
      word: "penguin",
      hint: "A large flightless seabird of the southern hemisphere, with black upper parts and white underparts",
    },
    {
      word: "volleyball",
      hint: "A game in which two teams hit an inflated ball over a high net using their hands",
    },
    {
      word: "kangaroo",
      hint: "A large plant-eating marsupial with powerful hind legs for leaping, native to Australia",
    },
    {
      word: "library",
      hint: "A building or room containing collections of books, periodicals, and sometimes films and recorded music",
    },
    {
      word: "rainbow",
      hint: "An arch of colors formed in the sky in certain circumstances, caused by the refraction and dispersion of the sun's light",
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

  while (options.size < 10 && tempWordList.length > 0) {
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
