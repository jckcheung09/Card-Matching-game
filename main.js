var cardPosition=[];
var amountOfPairs = 6;
for(i=0;i<amountOfPairs; i++){
  cardPosition.push(i);
  cardPosition.push(i);
}
var backgroundTheme = new Audio('sound/poem.mp3');
backgroundTheme.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
var victoryTheme = new Audio('sound/bluesInVelvetRoom.mp3');
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
function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function unmatched(selectedElement){
  $('#'+selectedElement).toggleClass('flipped')
  $('#'+firstLocation).toggleClass('flipped')
}
function resettingAfterUnmatch(){
  isAcardSelected=0;
   FirstCard='';
   firstLocation='';
   secCard='';
   secLocation='';
   matchedPair = 0;
   movesTaken = 0;
}

function startTimer(){
  if (hasGameStarted==false) {
  //   hasGameStarted=true;
  //   var sec = 0;
  //   function pad ( val ) { return val > 9 ? val : "0" + val; }
  //   setInterval( function(){
  //      $("#seconds").html(pad(++sec%60));
  //      $("#minutes").html(pad(parseInt(sec/60,10)));
  // }, 1000);
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
  console.log('time taken = '+finalTimeTaken+' seconds');
  $('#movesTaken').html(movesTaken+' moves');
  $('#time').html(finalTimeTaken+' seconds');
  backgroundTheme.pause();
  victoryTheme.play();
  document.getElementById("overlay2").style.display = "block";
}

// Load when webpage is ready
$(function() {

  $('#start').click(function(){document.getElementById("overlay1").style.display = "none"; backgroundTheme.play();});
  $('#stop').click(function(){ audio.currentTime = 0;});
  // shuffle array
  shuffle(cardPosition);
  shuffle(cardPosition);
  var i = 0;
  $('.flipper .back').each(function(){
    $(this).attr('id','i'+cardPosition[i])
    i++;
  })
  // give all the cards a on click
  $('.flipper').click(function(){
    startTimer();
    // only flip the card if it havent been flipped and it havent been matched with another card
    if($(this).hasClass('matched')==false && $(this).hasClass('flipped')==false){
      // check if a card have already been selected if none have been proceed
      if(isAcardSelected==0){
        $(this).addClass('flipped'); //flip the card
        isAcardSelected++; //set card selected to 1
        //storing the id and value of 1st card
        console.log(isAcardSelected);
        FirstCard = $(this).children('.back').attr('id');
        console.log('FirstCard= '+FirstCard);
        firstLocation = $(this).attr('id');
        console.log('location= '+firstLocation);
        // only activate when only 1 card have been selected to prevent more than 2 cards being selected
      }else if(isAcardSelected==1){
        movesTaken++;//increment moves taken by 1
        $('#moves').html('Moves Taken: '+movesTaken);//update movescounter on html
        isAcardSelected++;//set card selected to 2
        console.log(isAcardSelected);
        //storing the id and value of 2nd card
        $(this).addClass('flipped');
        secCard = $(this).children('.back').attr('id');
        console.log('2nd selected= '+secCard);
        secLocation=$(this).attr('id');
        console.log('2nd location= '+secLocation);
        //check if the 1st and 2nd card match, if they do run
        if(secCard==FirstCard){
          console.log('matched');
          $(this).addClass('matched')
          $('#'+firstLocation).addClass('matched')
          matchedPair++;
          //set a small delay before letting players select their next card, this is to prevent players from selecting a 3rd card
          setTimeout(function(){isAcardSelected=0;},500);
          //check if all the cards are paired if they are initiate end game
          if(matchedPair==amountOfPairs){
            setTimeout(function(){endGameStats();},500);

          }
        //if the 1st and 2nd card doesnt match reset both cards
        }else{
          console.log('does not match');
          //set a small delay before letting players select their next card and flipping back the 2 cards,this is to prevent players from selecting a 3rd card
          setTimeout(function(){
            unmatched(secLocation);
            isAcardSelected=0;
          },500);
        }
      }
    }

  })
  //set up overlay on click
  $('#retry').click(function(){
    location.reload();
  });
})
