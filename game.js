///////////////////////////////////VARS///////////////////////////////////
//Array containing the colour of the buttons
var buttonColours = ["red", "green", "blue", "yellow"];

//Variables for buttons
var buttonToBePressed;
var pressedButton;
var difficultyChosen;

//Variable containing the current level of the game, as well sa a boolean of whether the game started or not and can be played
var currentLevel = 0;
var hasStarted = false;
var canPlay = false;

//Holds the game's patterns up to this round
var expectedGameSequence = new Array ();
var userSequence = new Array ();
var userMoveNumber = 0;

///////////////////////////////////FUNCTIONS///////////////////////////////////
function addEventHandlerOnDifficultyButtonClick ()
{
  $(".btn-clear").click(function ()
  {
    if (!hasStarted)
    {
      $("h1").text("Press A KEY to START");
    }
    var difficulty = this.id;

    canPlay = true;
    difficultyChosen = difficulty;

    if (difficulty === "easy")
    {
      if ($("#hard").hasClass("btn-pressed"))
      {
        $("#hard").toggleClass("btn-pressed disabled");
      }
      $(this).toggleClass("btn-pressed disabled");
    }
    else
    {
      if ($("#easy").hasClass("btn-pressed"))
      {
        $("#easy").toggleClass("btn-pressed disabled");
      }
      $(this).toggleClass("btn-pressed disabled");
    }
  });
}

function addEventHandlerOnGameButtonClick ()
{
  $(".btn").click(function ()
    {
      if (checkIfGameCanBePlayed() && hasStarted)
      {
        //Stores the ID of the button pressed in a variable
        pressedButton = this.id;
        userSequence.push(pressedButton);

        //Plays the respective button's sound, as well as animates the button as per user click.
        playButtonSound(pressedButton);
        animateButtonOnPlayerClick("#" + pressedButton);

        //Checks if the player made a correct move.
        checkPlayerAnswer(userSequence);
      }
    });
}

function addEventHandlerOnDifficultyHover ()
{
  $("btn-clear").hover(function ()
    {
      if ($(this).text("easy"))
      {
        $(".difficulty-description").text("The entire sequence will be played each round.");
      }
      else
      {
        $(".difficulty-description").text("Good luck remembering everything up to this point...");
      }
    }, function ()
    {
      $(".difficulty-description").text("");
    });
}

function addEventHandlerOnKeyboardPress ()
{
  //On first keypress in the document, call nextSequence to initialize game and changes the game level text.
  $(document).keypress(function ()
  {
    if (checkIfGameCanBePlayed())
    {
      hasStarted = true;

      if (currentLevel === 0)
      {
          nextSequence ();
      }
    }
  });
}

function animateBackgroundOnWrongChoice ()
{
  $("body").toggleClass("game-over", 100).toggleClass("game-over", 100);
}

function animateButtonOnGameSequence(buttonToBeAnimated)
{
  $(buttonToBeAnimated).fadeToggle(200, function ()
    {
      //Function called whenever the fade animation (FadeOut) is complete.
      $(buttonToBeAnimated).fadeToggle(200);
    });
}

function animateButtonOnPlayerClick(buttonToBeAnimated)
{
  $(buttonToBeAnimated).toggleClass("pressed", 100).toggleClass("pressed", 100);
}

function arrayEquals(arrayA, arrayB)
{
  //Checks if the arrays are exactly the same.

  if(arrayA instanceof Array && arrayB instanceof Array)
  {
    if(arrayA.length != arrayB.length)
    {
      return false;
    }

    for(var i = 0; i < arrayA.length; i++)
    {
      if(!arrayEquals(arrayA[i], arrayB[i]))
      {
        return false;
      }
    }

    return true;
  }
  else
  {
    return arrayA == arrayB;
  }
}
function changeGameTextToLevel(gameLevel)
{
  $("#level-title").text("Level " + gameLevel);
}

function changeGameTextToReset()
{
  $("#level-title").text("Too bad! Press any key to try again!");
}

function checkIfGameCanBePlayed ()
{
  //If no difficulty is set, do nothing.
  if (!canPlay)
  {
    return false;
  }
  else
  {
    return true;
  }
}

///Compares player answer to expected sequence. If correct, keep going. If not, play 'Wrong' audio and re-start.
function checkPlayerAnswer(userMove)
{
  if(!arrayEquals(userMove, expectedGameSequence))
  {
    if(userMove[userMoveNumber] != expectedGameSequence[userMoveNumber])
    {
      wrongChoice();
    }
    else
    {
      userMoveNumber++;
    }
  }
  else
  {
    roundReset ();
    setTimeout(nextSequence, 1000);
  }

}

function nextSequence ()
{

  //Sets min-max values for the rolls
  var minimumNumber = 0;
  var maximumNumber = 3;

  //Generates a random number based on the min-max values set up earlier.
  var randomNumber = Math.floor(Math.random () * (maximumNumber - minimumNumber + 1) + minimumNumber);

  //Adds the button ID and the colour name to variables
  buttonToBePressed = buttonColours[randomNumber];

  //Adds current button colour to the game sequence array
  expectedGameSequence.push(buttonToBePressed);

  //Sets the current level to the length of the current game sequence
  currentLevel = expectedGameSequence.length;

  //Functions that checks if the game has already started

  switch (difficultyChosen)
  {
    case "easy":
      //If difficulty is set to easy, play the whole sequence after the first level.
      if (currentLevel > 1)
      {
        //If so, set a counter variable to 0
        var i = 0;
        //Calls setinterval because for loops in JS don't respect setTimeout. Will basically play out all of the moves so far.
        var showPreviousMoves = setInterval(function()
          {

            playButtonSound(expectedGameSequence[i]);
            animateButtonOnGameSequence("#" + expectedGameSequence[i]);
            i++;
            if (i === currentLevel)
            {
              clearInterval(showPreviousMoves);
            }
          }, 400);
      }
      else
      {
        playButtonSound(buttonToBePressed);
        animateButtonOnGameSequence("#" + buttonToBePressed);
      }
      break;

    case "hard":
      //If difficulty is hard, only play current move.
      playButtonSound(buttonToBePressed);
      animateButtonOnGameSequence("#" + buttonToBePressed);
      break;

    default:
      alert("Something has gone horribly wrong.");
      break;
  }

  changeGameTextToLevel(currentLevel);
}

function playButtonSound(buttonToBePlayed)
{
  switch (buttonToBePlayed)
  {
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play ();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play ();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play ();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play ();
      break;
  }
}

function restartGame ()
{
  //Resets variables, changes gameText to the initial value and re-starts the sequence.
  expectedGameSequence.length = 0;
  userSequence.length = 0;

  hasStarted = false;

  currentLevel = 0;
  userMoveNumber = 0;

  changeGameTextToReset();
}

function roundReset ()
{
  //Resets user variables for the next round.
  userSequence.length = 0;

  userMoveNumber = 0;
}

function wrongChoice ()
{
  animateBackgroundOnWrongChoice ();
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play ();

  setTimeout(restartGame, 200);
}

///Main////
addEventHandlerOnKeyboardPress ();
addEventHandlerOnDifficultyButtonClick();
addEventHandlerOnDifficultyHover ();
addEventHandlerOnGameButtonClick ();
