//selecting elements
const dice = document.querySelector(".dice");
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1"); //same as querySelector but faster than that.
const buttonNew = document.querySelector(".btn--new");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const playerActive0 = document.querySelector(".player--0");
const playerActive1 = document.querySelector(".player--1");

//staring conditions
let scores, playing, current_score, active_player;
const init = function () {
  current_score = 0;
  active_player = 0;
  scores = [0, 0];
  playing = true;

  currentScore0.textContent = "0";
  currentScore1.textContent = "0";
  score0EL.textContent = "0";
  score1EL.textContent = "0";

  dice.classList.add("hidden");
  playerActive0.classList.add("player--active");
  playerActive1.classList.remove("player--active");
  playerActive0.classList.remove("player--winner");
  playerActive1.classList.remove("player--winner");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${active_player}`).textContent = 0;
  active_player = active_player === 0 ? 1 : 0;
  current_score = 0;
  playerActive0.classList.toggle("player--active"); // toggling classes of html elements
  playerActive1.classList.toggle("player--active");
};
// rolling the dice
buttonRoll.addEventListener("click", function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      current_score += diceNumber;
      document.getElementById(`current--${active_player}`).textContent = // dynamically assign id value
        current_score;
    } else {
      //switching next player
      switchPlayer();
    }
  }
});
// hold button functionality

//1. add current score to player's score
buttonHold.addEventListener("click", function () {
  if (playing) {
    scores[active_player] += current_score;
    document.getElementById(`score--${active_player}`).textContent =
      scores[active_player];
    //2. check if score is greater>=50
    if (scores[active_player] >= 50) {
      //finish the game
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${active_player}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove("player--active");
    } else {
      //3. switch for the next player;
      switchPlayer();
    }
  }
});
// reset functionality
buttonNew.addEventListener("click", init);
