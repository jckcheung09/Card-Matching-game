var cardPosition=[];
var amountOfPairs = 0;
var backgroundTheme = new Audio('sound/poem.mp3');
backgroundTheme.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
var victoryTheme = new Audio('sound/bluesInVelvetRoom.mp3');
var wrongPair = new Audio('sound/denied.mp3');
var matchedSfx = new Audio('sound/matched.mp3');
var cardOpenSfx = new Audio('sound/cardOpen.mp3');
var isAcardSelected=0;
var FirstCard;
var firstLocation;
var secCard;
var secLocation;
var matchedPair = 0;
var movesTaken = 0;
var hasGameStarted = false;
var startTime;
var elapsedTime;
var finalTimeTaken;
var movesAllowed = 100;
var timeLimit=1000000;
function shuffle() {
  for(i=0;i<amountOfPairs; i++){
    cardPosition.push(i);
    cardPosition.push(i);
  }
  let counter = cardPosition.length;
  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      let temp = cardPosition[counter];
      cardPosition[counter] = cardPosition[index];
      cardPosition[index] = temp;
  }
  return cardPosition;
}
function unmatched(selectedElement){
  $('#'+selectedElement).toggleClass('flipped')
  $('#'+firstLocation).toggleClass('flipped')
}
function startTimer(){
  if (hasGameStarted==false) {
  hasGameStarted=true;
  startTime = Date.now();
  var interval = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(2);
  }, 100);
  }
}
function endGameStats(){
  finalTimeTaken = (elapsedTime / 1000).toFixed(2);
  $('#movesTaken').html(movesTaken+' moves');
  $('#time').html(finalTimeTaken+' seconds');
  backgroundTheme.pause();
  victoryTheme.play();
  document.getElementById("overlay2").style.display = "block";
}
function gameLost(){
  finalTimeTaken = (elapsedTime / 1000).toFixed(2);
  $('#movesTaken').html(movesTaken+' moves');
  $('#time').html(finalTimeTaken+' seconds');
  $('#rowB,#rowC,#rowA,.thebackground').hide();
  document.getElementById("overlay3").style.display = "block";
}
function gameLost2(){
  finalTimeTaken = (elapsedTime / 1000).toFixed(2);
  $('#movesTaken').html(movesTaken+' moves');
  $('#time').html(finalTimeTaken+' seconds');
  $('#rowB,#rowC,#rowA,.thebackground').hide();
  document.getElementById("overlay4").style.display = "block";
}
function init(howManyPairs){
  switch (howManyPairs) {
    case 2:
      $('#rowA,.thebackground').show();
      break;
    case 4:
      $('#rowA,#rowB,.thebackground').show();
      break;
    case 6:
    $('#rowA,#rowB,#rowC,.thebackground').show();
      break;
      case 999:
      $('#rowA,#rowB,#rowC,.thebackground').show();
      timeLimit=15000;
      movesAllowed=11;
      howManyPairs=6;
        break;
  }
  amountOfPairs = howManyPairs;
  document.getElementById("overlay1").style.display = "none";
  backgroundTheme.play();
  // shuffle array
  shuffle();
  var i = 0;
  $('.flipper .back').each(function(){
    $(this).attr('id','i'+cardPosition[i])
    i++;
  })
  // give all the cards a on click
  $('.flipper').click(function(){
    if (movesTaken>=movesAllowed) {
      gameLost();
    }else if (elapsedTime>=timeLimit) {
      gameLost2();
    }
    startTimer();
    // only flip the card if it havent been flipped and it havent been matched with another card
    if($(this).hasClass('matched')==false && $(this).hasClass('flipped')==false){
      cardOpenSfx.pause();
      cardOpenSfx.currentTime = 0.02;
      cardOpenSfx.play();
      // check if a card have already been selected if none have been proceed
      if(isAcardSelected==0){
        $(this).addClass('flipped'); //flip the card
        isAcardSelected++; //set card selected to 1
        //storing the id and value of 1st card
        FirstCard = $(this).children('.back').attr('id');
        firstLocation = $(this).attr('id');
        // only activate when only 1 card have been selected to prevent more than 2 cards being selected
      }else if(isAcardSelected==1){
        movesTaken++;//increment moves taken by 1
        $('#moves').html('Moves Taken: '+movesTaken);//update movescounter on html
        isAcardSelected++;//set card selected to 2
        //storing the id and value of 2nd card
        $(this).addClass('flipped');
        secCard = $(this).children('.back').attr('id');
        secLocation=$(this).attr('id');
        //check if the 1st and 2nd card match, if they do run
        if(secCard==FirstCard){
          $(this).addClass('matched')
          $('#'+firstLocation).addClass('matched');
          matchedSfx.pause();
          matchedSfx.currentTime = 0;
          matchedSfx.play();
          $('.matched').children().css({'animation':'stop'});
          setTimeout(function(){$('.matched').children().css({'animation':'neon1 1.5s ease-in-out infinite alternate'});}, 1)
          matchedPair++;
          //set a small delay before letting players select their next card, this is to prevent players from selecting a 3rd card
          setTimeout(function(){isAcardSelected=0;},500);
          //check if all the cards are paired if they are initiate end game
          if(matchedPair==amountOfPairs){
            setTimeout(function(){$('#rowB,#rowC,#rowA,.thebackground').hide();endGameStats();},1000);

          }
        //if the 1st and 2nd card doesnt match reset both cards
        }else{
          wrongPair.pause();
          wrongPair.currentTime = 0;
          wrongPair.play();
          //set a small delay before letting players select their next card and flipping back the 2 cards,this is to prevent players from selecting a 3rd card
          setTimeout(function(){
            unmatched(secLocation);
            isAcardSelected=0;
          },500);
        }
      }
    }

  })
}

// Load when webpage is ready
$(function() {
  $('#rowB,#rowC,#rowA,.thebackground').hide();
  $('#fourCards').click(function(){init(2)});
  $('#eightCards').click(function(){init(4)});
  $('#twelveCards').click(function(){init(6)});
  $('#maniacMode').click(function(){init(999)});
  //set up overlay on click
  $('#retry').click(function(){
    location.reload();
  });
  $('#retry2').click(function(){
    location.reload();
  });
  $('#retry3').click(function(){
    location.reload();
  });
})
