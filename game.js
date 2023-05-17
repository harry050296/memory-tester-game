var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(".play").click(function() {
    $("#input").fadeOut();
    $(".play").fadeOut();
    alert("Game starts, please pay attention and memorize order of blinking colors!")
    if(!started) {
        $("#level-title").text("Level "+ level);
        setTimeout(function() {
            newSequence();
        },500);
        started = true;
    }

});

$(".btns").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              newSequence();
            }, 1000);
    
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },250);
        var name = $("#input").val();
        $("#level-title").html("User " + name + " has reached till level " + level + "<br /> Press Play to Restart !");
        startOver();
    }
}

function newSequence() {

    userClickedPattern = [];

    level ++;
    
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor); 
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    $("#input").fadeIn();
    $(".play").fadeIn();
}