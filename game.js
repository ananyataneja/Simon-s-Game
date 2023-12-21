buttonColors=["red","blue","green","yellow"];
gamePattern=[];
userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(started==false){
        nextSequence();
        $("h1").text("Level "+level);
        started=true;
    }
});

$(".btn").click(function(Event){
    var userChosenColour=Event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log(userClickedPattern);
        console.log(gamePattern);
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function nextSequence() {
    userClickedPattern = [];
    level=level+1;
    $("h1").text("Level "+level);
    var num=Math.floor(4*Math.random());
    var randChosenColor=buttonColors[num];
    gamePattern.push(randChosenColor);
    $("#" + randChosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
    
}

