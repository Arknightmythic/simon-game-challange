var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log("user pattern " + userClickedPattern);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  console.log("game pattern " + gamePattern);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  console.log(gamePattern.length);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// var buttonColour = ["red", "blue", "green", "yellow"];
// var gamePattern = [];
// var userClickedPattern = [];

// function newSequence() {
//   var randomNumber = Math.floor(Math.random() * 3);
//   var randomChosenColour = buttonColour[randomNumber];
//   gamePattern.push(randomChosenColour);
// }

// $("#red").click(function (e) {
//   $("#red").fadeOut(100, "swing").fadeIn(100, "swing");
//   var audio = new Audio("./sounds/red.mp3");
//   audio.play();
//   var userChosenColour = e.target.id;
//   userClickedPattern.push(userChosenColour);
// });

// $("#blue").click(function (e) {
//   $("#blue").fadeOut(100, "swing").fadeIn(100, "swing");
//   var audio = new Audio("./sounds/blue.mp3");
//   audio.play();
//   var userChosenColour = e.target.id;
//   userClickedPattern.push(userChosenColour);
// });

// $("#yellow").click(function (e) {
//   $("#yellow").fadeOut(100, "swing").fadeIn(100, "swing");
//   var audio = new Audio("./sounds/yellow.mp3");
//   audio.play();
//   var userChosenColour = e.target.id;
//   userClickedPattern.push(userChosenColour);
// });

// $("#green").click(function (e) {
//   $("#green").fadeOut(100, "swing").fadeIn(100, "swing");
//   var audio = new Audio("./sounds/green.mp3");
//   audio.play();
//   var userChosenColour = e.target.id;
//   userClickedPattern.push(userChosenColour);
// });
