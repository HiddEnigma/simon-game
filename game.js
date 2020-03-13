//Array containing the colour of the buttons
var buttonColours = ["red", "green", "blue", "yellow"];
var currentButton;

//Holds the game's patterns up to this round
var gamePattern;

function nextSequence()
{
  //Sets min-max values for the rolls
  var minimumNumber = 0;
  var maximumNumber = 3;

  //Generates a random number based on the min-max values set up earlier.
  var randomNumber = Math.floor(Math.random() * (maximumNumber - minimumNumber + 1) + minimumNumber);

  //TO-DO:
  //Add the value of the selector into a variable -- OK
  //Call the respective sound whenever the respective button is called -- OK
  //Wrap it up in a separate function for readability -- HALF
  currentButton = "#" + buttonColours[randomNumber];

  //Function to play the button's respective sound.
  playButtonSound(currentButton);
  $(currentButton).fadeToggle("complete", function()
    {
      //Function called whenever the fade animation (FadeOut) is complete.
      $(currentButton).fadeToggle();
    });
}

function playButtonSound(buttonToBePlayed)
{
  switch (buttonToBePlayed)
  {
    case "#red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "#green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "#blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "#yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
  }
}
