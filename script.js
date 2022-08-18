'use strict';

// DOM Manipulation
// console.log(
//   (document.querySelector('.message').textContent = 'Hello Zaheer Right Guess')
// );

let secretNumber = Math.trunc(Math.random() * 20) + 1;
// console.log(secretNumber);
let score = document.querySelector('.score').textContent;
let highscore = document.querySelector('.highscore').textContent;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

let audio;

const playSound = function (name) {
  audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
};

const pauseSound = function () {
  audio.pause();
};

document.querySelector('.check').addEventListener('click', function () {
  // console.log(document.querySelector('.guess').value);
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('🙅🏻 Please enter a number');
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      playSound('wrong');
      document.querySelector('.score').textContent = score;
      displayMessage('💥 You lost the game');
      document.querySelector('body').style.backgroundColor = '#C21010';
    }
  } else if (guess === secretNumber) {
    displayMessage('You are right 🥇🥳🎉');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (highscore < score) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    playSound('won');
  }
});

document.querySelector('.again').addEventListener('click', function () {
  pauseSound();
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // console.log(secretNumber);
  document.querySelector('.guess').value = '';
  displayMessage('Start Guessing again');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.score').textContent = 20;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
});
