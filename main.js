'use strict';

var chance = 0;
var boxes = Array.prototype.slice.call(document.querySelectorAll(".box"));
var fiveSeconds = 5;
var display = document.querySelector('#time');
var startButton = document.querySelector('#start');
var chances = ["First", "Second", "Last"];

document.addEventListener('DOMContentLoaded', init);

function init() {
  for (var box of boxes) {
    box.style.backgroundColor = "#444";
  }
  display.textContent = fiveSeconds;
  document.querySelector('#chance').textContent = chances[chance];
  randomizeBoxes();
  startButton.textContent = "Start"
  startButton.addEventListener('click', setupTimer, false);
}

function setupTimer() {
  for (var idx = 0; idx < 25; idx++) {
    document.getElementById(idx).addEventListener('click', handleClick, false);
  }
  startTimer(fiveSeconds, display);
  startButton.textContent = "Started ..."
}

function handleClick(el) {
  el.target.style.backgroundColor = "#444";
}

function startTimer(duration, display) {
  var timer = duration - 1;
  var seconds = 0;
  var interval = setInterval(function () {
      seconds = parseInt(timer % 60, 10);
      display.textContent = seconds;

      if (--timer < 0) {
          clean(interval);
      }
  }, 1000);
}

function clean(interval) {
  clearInterval(interval);
  chance++;

  document.querySelector('#start').removeEventListener('click', setupTimer, false);
  for (var idx = 0; idx < 25; idx++) {
    document.getElementById(idx).removeEventListener('click', handleClick, false);
  }

  for (var box of boxes) {
    if (box.style.backgroundColor === "red") {
      if (chance > 2) {
        return alert("Game Over!");
      }
      alert("You couldn't make it. Try again.");
      return init();
    }
  }
  alert("Congratulations, you won!");
}

function randomizeBoxes() {
  var randomCells = [];
  for (var i=0; i<5; i++) {
    var value = Math.floor(Math.random() * 25);
    while (randomCells.indexOf(value) !== -1) {
      value = Math.floor(Math.random() * 25);
    }
    randomCells.push(value);
  }
  for (var index of randomCells) {
    document.getElementById(index).setAttribute("style", "background-color: red;");
  }
}
