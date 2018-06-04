var cardPosition=[];
var amountOfPairs = 4;
for(i=0;i<amountOfPairs; i++){
  cardPosition.push(i);
  cardPosition.push(i);
}
var isAcardSelected=0;
var cardSelected;
var cardLocation;
var secCard;
var currentLocation;
var matchedPair = 0;
var secLocation;

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
  $('#'+cardLocation).toggleClass('flipped')
}
function resettingAfterUnmatch(){
  cardSelected='';
  cardLocation='';
  secCard='';
  currentLocation='';
}

// Load when webpage is ready
$(function() {
  // shuffle array
  shuffle(cardPosition);
  var i = 0;
  $('.flipper .back').each(function(){
    $(this).attr('id','i'+cardPosition[i])
    i++;
  })
  // give all the cards a on click
  $('.flipper').click(function(){
    if($(this).hasClass('matched')==false && $(this).hasClass('flipped')==false){
      if(isAcardSelected==0){
        $(this).addClass('flipped');
        isAcardSelected++;
        cardSelected = $(this).children('.back').attr('id');
        console.log('selected= '+cardSelected);
        cardLocation = $(this).attr('id');
        console.log('location= '+cardLocation);
      }else if(isAcardSelected==1){
        isAcardSelected++;
        // switch off input until complete
        $('.flipper').css("pointer-events", "none");
        $(this).addClass('flipped');
        secCard = $(this).children('.back').attr('id');
        console.log('2nd selected= '+secCard);
        secLocation=$(this).attr('id');
        console.log('2nd location= '+secLocation);
        if(secCard==cardSelected){
          console.log('matched');
          $(this).addClass('matched')
          $('#'+cardLocation).addClass('matched')
          matchedPair++;
          isAcardSelected=0;
          $('.flipper').css("pointer-events", "auto");
          if(matchedPair==amountOfPairs){
            alert('Congratulations you win!!!!');
          }
        }else{
          console.log('does not match');
          currentLocation = $(this).attr('id')
          setTimeout(function(){unmatched(currentLocation);},500);
          isAcardSelected=0;
          $('.flipper').css("pointer-events", "auto");
        }
      }
    }

  })

})
