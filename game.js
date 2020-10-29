var userClickedPattern = []
var gamePattern = []
var level = 0
var started = "false"


//Start the game

$(document).keypress(function() {
  if (started === "false") {
    $("h1").text("Level " + level);
    nextSequence();
    started = "true"
  }
});


//Create a Sequence

function nextSequence() {

  // Create a random Color
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomChosenColor = buttonColors[randomNumber];

  // Add Random color to sequence
  gamePattern.push(randomChosenColor);

  // Make button flash
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  //Make a sound
  var sound = new Audio("sounds/" + randomChosenColor + ".mp3");
  sound.play();

  //raise the level
  level = (level + 1);

  // Change title to current level
  $("h1").text("Level " + level);
}



//User Actions
//Detect the color the user clicked and call all functions
$(".btn").click(function() {
  if (started === "true") {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

  if (userClickedPattern[(userClickedPattern.length) - 1] === gamePattern[(userClickedPattern.length) - 1]){
    playSound(userChosenColor);
  }

    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length) - 1);
  }
});

// play a sound when clicked
function playSound(name) {
  var userSound = new Audio("sounds/" + name + ".mp3");
  userSound.play();
}

//animate button when clicked
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  window.setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100)
}

// Check answer and Recall Sequence

function checkAnswer(currentLevel) {
  // Check if the current clicked color is the same as the Pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // If it's the same as the current pattern, check if the pattern is done
    if (userClickedPattern.length === gamePattern.length) {
      window.setTimeout(function() {
        // If it's done, Continue the sequence
        nextSequence();
      }, 1000)
      userClickedPattern = []
    }
  } else {
    //If it's wrong, Game Over
    // play game over sound
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    // flash the body
    $("body").addClass("game-over");
    window.setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    // Change the H1
    $("h1").text("Game Over, Press Any Key to Restart")
    // Reset both pattern, user pattern and game level
    userClickedPattern = []
    gamePattern = []
    level = 0
    // set started to false
    started = "false"

  }
}
