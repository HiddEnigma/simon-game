//Array containing the colour of the buttons
var buttonColours = ["red", "green", "blue", "yellow"];
var buttonToBePressed;
var pressedButton;

//Holds the game's patterns up to this round
var expectedGameSequence = new Array();
var userSequence = new Array();

function nextSequence()
{
  //Sets min-max values for the rolls
  var minimumNumber = 0;
  var maximumNumber = 3;

  //Generates a random number based on the min-max values set up earlier.
  var randomNumber = Math.floor(Math.random() * (maximumNumber - minimumNumber + 1) + minimumNumber);

  //Adds the button ID and the colour name to variables
  buttonToBePressed = buttonColours[randomNumber];

  //Function to play the button's respective sound.
  playButtonSound(buttonToBePressed);
  animateButtonOnGameSequence("#" + buttonToBePressed);
}

function animateButtonOnGameSequence(buttonToBeAnimated)
{
  $(buttonToBeAnimated).fadeToggle(200, function()
    {
      //Function called whenever the fade animation (FadeOut) is complete.
      $(buttonToBeAnimated).fadeToggle(200);
    });
}

function animateButtonOnPlayerClick(buttonToBeAnimated)
{
  $(buttonToBeAnimated).toggleClass("pressed", 200).toggleClass("pressed", 200);
}

function playButtonSound(buttonToBePlayed)
{
  switch (buttonToBePlayed)
  {
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
  }
}

function addEventHandlerOnButtonClick()
{
  $(".btn").click(function()
    {
      //Stores the ID of the button pressed in a variable
      pressedButton = this.id;

      userSequence.push(pressedButton);

      //Plays the respective button's sound, as well as animates the button as per user click.
      playButtonSound(pressedButton);
      animateButtonOnPlayerClick("#" + pressedButton);

      console.log(userSequence);
    });
}





///Main////

addEventHandlerOnButtonClick();
