var buttonColor=["red","blue","green","yellow"];
var gamePattern=[];


var level=0;

var started=false;

$(document).keypress(function(){
  if(!started){
    $("#"+"level-title").text("Level "+level);
    nextSquence();
    started=true;
  }

});
$(document).click(function(){
  if(!started){
    $("#"+"level-title").text("Level "+level);
    nextSquence();
    started=true;
  }

});


// to check and working of the click
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);


    checkAnswer(userClickedPattern.length-1);
});


function nextSquence(){
  userClickedPattern=[];
  nextSeq();
  var randomNumber=Math.floor(Math.random()*4);
  var randomColorChoosen=buttonColor[randomNumber];
  gamePattern.push(randomColorChoosen);

   // to select ids with jquery ,we need to add # symbol
  $("#" + randomColorChoosen).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomColorChoosen);


}
// For playing sound
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

// To apply animation

function animatePress(currentColor){

  var pressedKey=$("#"+currentColor);
  pressedKey.addClass("pressed");

  setTimeout(function(){
    pressedKey.removeClass("pressed");
  },100);
}


// for nextseq
function nextSeq(){
  level++;
  $("h1").text("Level "+level);

}

// to configure answer
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSquence();
      }, 1000);

    }
  }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      checkOver();
  }

}

function checkOver(){

  level = 0;
  gamePattern = [];
  started=false;
}
