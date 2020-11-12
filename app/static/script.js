const CLICKS_NUMER = 10;

let gameStarted = false;
let clicks = CLICKS_NUMER;

let startTime, intervalId, elapsedTime;

const clickButton = document.querySelector("#click-btn");
const timerH3 = document.querySelector("#timer");
const addHighScoreForm = document.querySelector("#add-highscore");
const highScoreUl = document.querySelector("#highscore");

let highScores = [];
loadHighScores();
showHighScores();

clickButton.addEventListener("click", (event) => {
  if (!gameStarted) {
    gameStarted = true;
    startTime = Date.now();
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timerH3.innerText = `Timer: ${elapsedTime}ms`;
    }, 55);
  }

  clicks -= 1;
  if (clicks === 0) {
    clearInterval(intervalId);
    clickButton.disabled = true;
    elapsedTime = Date.now() - startTime;
    addHighScoreForm.submit.disabled = false;
  }
  clickButton.innerText = clicks;
});

addHighScoreForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newHighScore = {
    nickname: addHighScoreForm.nickname.value,
    time: elapsedTime,
  };
  highScores.push(newHighScore);

  // Tutaj posortuj highScores hint: highScores.sort()
  //  highScores.sort(function(element1, element2){
  //     return element1.time - element2.time
  // })
  highScores.sort((a, b) => a.time - b.time);

  showHighScores();
  saveHighScore(newHighScore);
  resetGame();
});

function showHighScores() {
  highScoreUl.innerHTML = "";

  for (let i = 0; i < highScores.length; i++) {
    const { nickname, time } = highScores[i];
    const newLi = `<li><h2>${nickname} : ${time} ms</h2></li>`;
    highScoreUl.innerHTML += newLi;
  }
}

function resetGame() {
  gameStarted = false;
  clicks = CLICKS_NUMER;
  clickButton.innerText = clicks;
  clickButton.disabled = false;
  addHighScoreForm.reset();
  addHighScoreForm.submit.disabled = true;
}

function saveHighScore(newHighScore) {}

function loadHighScores() {}
