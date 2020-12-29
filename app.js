//create variables
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStarted = false;


//start the game
$(document).keypress(function() {
  if (gameStarted === false) {
    gameStarted = true;
    $("h1").text("Level " + level)
    nextSequence();
  } else {}

});


//Function for the automated sequence
function nextSequence() {
  // Create a sequence of random colors and add it to the Pattern
  var randomNumber = Math.floor(Math.random() * 4)
  var colors = ["red", "blue", "yellow", "green"]
  var randomColor = colors[randomNumber]
  gamePattern.push(randomColor);

  //raise the level
  level = level + 1;
  $("h1").text("Level " + level)

  //Play the full sequence with sounds and animations

  const timer = ms => new Promise(res => setTimeout(res, ms))

  async function playPattern() {
    for (i = 0; i < level; i++) {
      $("#" + gamePattern[i]).fadeOut(100);
      $("#" + gamePattern[i]).fadeIn(100);
      var sound = new Audio("sounds/" + gamePattern[i] + ".mp3");
      sound.play();
      await timer(500);
    }
  };
  playPattern();
}




//detect user inputs

$(".btn").click(function() {
  // Check if game has started
  if (gameStarted === true) {
    //detect which color was clicked
    var userColor = $(this).attr("id")
    //add that color to the user Pattern
    userPattern.push(userColor)
    //Call all relevant functions
    animate(userColor)
    checkAnswer((userPattern.length) - 1);
  }
});



//play sounds
function playSound(color) {
  var userSound = new Audio("sounds/" + color + ".mp3")
  userSound.play();
};

//animate
function animate(color) {
  $("." + color).addClass("pressed");
  window.setTimeout(function() {
    $("." + color).removeClass("pressed");
  }, 100)
}


//Check answer and call next sequence
function checkAnswer(currentLevel) {
  //Check if the current color matches  that of the game Pattern
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    //play the sound of the button if it does
    playSound(userPattern[currentLevel]);
    //check to see if the sequence has been completed
    if (userPattern.length === gamePattern.length) {
      //if it has, empty the user pattern, wait 1 second and call in the next sequence
      userPattern = [];
      window.setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    // if any of these is false end the game
    //Play the game Over sound
    var wrong = new Audio ("sounds/wrong.mp3")
    wrong.play();
    //flash the screen red
    $("body").addClass("gameOver");
    window.setTimeout(function(){
      $("body").removeClass("gameOver");
    },200);
    //end the game
    gameStarted = false;
    //empty both patterns and set level to 0
    level = 0;
    gamePattern = [];
    userPattern = [];
    // change title
    $("h1").text("Game Over, press any key to try again");


  }
};
