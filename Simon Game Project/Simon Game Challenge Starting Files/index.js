let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let initiation = false;

function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);
    
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

//detect keyboard presses 
$(document).keydown( function () {

    $("#level-title").text("Level " + level);
    if (!initiation) {
        nextSequence();
        initiation = true;
    }

});

//detect user click function
$(".btn").click( function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1); //this actually logs an index. Basically returns a numeral. NOT THE COLOR(STRINGS)

});

//sound
function playSound(name) {
    
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation for userClicked
function animatePress(currentColor) {
    let activeButton = $("." +  currentColor);

    $(activeButton).addClass("pressed");

    setTimeout(() => {
        $(activeButton).removeClass("pressed");
    }, 100);
}

//checking the answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("user's last index is correct");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } 
    else {
        
        let gameover = new Audio("sounds/wrong.mp3");
        gameover.play();

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        
        startOver();

    }
}

function startOver() {
    initiation = false;
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
}