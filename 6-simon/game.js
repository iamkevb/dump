let gameStarted = false;
let gamePattern = [];
let currentIndex = 0;
let buttonColors = ["red", "blue", "green", "yellow"];
let sounds = [
  new Audio("sounds/red.mp3"),
  new Audio("sounds/blue.mp3"),
  new Audio("sounds/green.mp3"),
  new Audio("sounds/yellow.mp3"),
];


function start() {
  if (gameStarted) { return; }
  gamePattern = [];
  nextSequence();
  playGamePattern();
  gameStarted = true;
  updateGameTitle();
}

function playGamePattern() {
  wait = 0;
  gamePattern.forEach((buttonIndex) => {
    window.setTimeout(() => {
      playButton(buttonIndex)
    }, wait);
    wait += sounds[buttonIndex].duration + 1000;
  });
}

function nextSequence() {
  let next = Math.floor(Math.random() * 4);
  gamePattern.push(next);
}

function playButton(i) {
  if (!gameStarted) { return; }
  $("#"+buttonColors[i]).fadeOut(100).fadeIn(100);
  sounds[i].play();
}

function handleAction(e) {
  if (!gameStarted) { return; }
  let clickedButton = buttonColors.indexOf(e.target.id);
  playButton(clickedButton);
  if (clickedButton != gamePattern[currentIndex]) {
    playLoser();
    return;
  }
  currentIndex++;
  if (currentIndex == gamePattern.length) {
    window.setTimeout(addToGamePattern, 1000);
    currentIndex = 0;
  }
}

function addToGamePattern() {
  nextSequence();
  updateGameTitle();
  playGamePattern();
}

function playLoser() {
  new Audio("sounds/wrong.mp3").play();
  gameStarted = false;
  updateGameTitle();
}

function updateGameTitle() {
  console.log("update game title " + gamePattern.length + " " + gameStarted);
  if (!gameStarted) {
    $("#level-title").text("Press Start");
  } else  {
    $("#level-title").text("Level " + gamePattern.length);
  }
}

$("#start").click(() => start());
$(".action").click((e) => { handleAction(e) });