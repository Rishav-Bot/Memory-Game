/* Stores all the colours available in the game */
var buttonColours = ["red", "blue", "green", "yellow"];

//  patterns 
var gamepattern = [];
var userClickedPattern = [];

// variables used 
var started = false;
var level = 0;

// Function to start the game by pressing any button on the keyboard
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

// Whenever user clicked buttons this function is called
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

// Function for checking answer
function checkAnswer(currentLevel){

    if( gamepattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if( userClickedPattern.length === gamepattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Function to show the desired sequence
function nextSequence() {
    
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500);
    playSound(randomChosenColour);
}

//Function for playing sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed"); 
    }, 100);
}


function startOver(){
    level = 0;
    gamepattern = [];
    started = false;
}