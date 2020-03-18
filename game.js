///////////////////////////////////VARS///////////////////////////////////
//Array containing the colour of the buttons
var buttonColours = ["red", "green", "blue", "yellow"];

//Variables for buttons
var buttonToBePressed;
var pressedButton;

//Variable containing the current level of the game
var currentLevel = 0;

//Holds the game's patterns up to this round
var expectedGameSequence = new Array();
var userMoveNumber = 0;

///////////////////////////////////FUNCTIONS///////////////////////////////////
function addEventHandlerOnButtonClick()
{
  $(".btn").click(function()
    {
      //Stores the ID of the button pressed in a variable
      pressedButton = this.id;
      userMoveNumber++;

      //Plays the respective button's sound, as well as animates the button as per user click.
      playButtonSound(pressedButton);
      animateButtonOnPlayerClick("#" + pressedButton);

      //Checks if the player made a correct move.
      checkPlayerAnswer(pressedButton);
    });
}

function addEventHandlerOnKeyboardPress()
{
  //On first keypress in the document, call nextSequence to initialize game and changes the game level text.
  $(document).one("keypress", function()
  {
    nextSequence();
    changeGameText(currentLevel)
  });
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
  $(buttonToBeAnimated).toggleClass("pressed", 100).toggleClass("pressed", 100);
}

function changeGameText(gameLevel)
{
  $("#level-title").text("Level " + gameLevel);
}

///Compares player answer to expected sequence. If correct, keep going. If not, play 'Wrong' audio and re-start.
function checkPlayerAnswer(userMove)
{
  if(userMove != expectedGameSequence[userMoveNumber])
  {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    //Debug:
    console.log(userMove + " was not a correct move. It should have been: " + expectedGameSequence[userMoveNumber]);

    setTimeout(restartGame, 1000);
  }

  if(userMoveNumber === currentLevel)
  {
    userMoveNumber = 0;
    setTimeout(nextSequence, 400);
  }

  //Debug:
  console.log(userMove + " was a correct move.");
}

function nextSequence()
{
  //Sets min-max values for the rolls
  var minimumNumber = 0;
  var maximumNumber = 3;

  //Generates a random number based on the min-max values set up earlier.
  var randomNumber = Math.floor(Math.random() * (maximumNumber - minimumNumber + 1) + minimumNumber);

  //Adds the button ID and the colour name to variables
  buttonToBePressed = buttonColours[randomNumber];

  //Adds current button colour to the game sequence array
  expectedGameSequence.push(buttonToBePressed);

  //Sets the current level to the length of the current game sequence
  currentLevel = expectedGameSequence.length;

  //Functions to play the button's respective sound, animate the button and change game text.
  playButtonSound(buttonToBePressed);
  animateButtonOnGameSequence("#" + buttonToBePressed);
  changeGameText(currentLevel);
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

function restartGame()
{
  expectedGameSequence.length = 0;

  currentLevel = 0;
  
  changeGameText(currentLevel);
}


///Main////
addEventHandlerOnKeyboardPress();
addEventHandlerOnButtonClick();
