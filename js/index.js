//must check if tile already has something
$(".tile").on("click", function(){
  if( $(this).hasClass("unavailable") ){
    return false;
  }
  

  var tileOrder = document.querySelectorAll(".tile");
  var victories = 0;
  var draws = 0;
  var defeats = 0;

  $(this).append("X").addClass("unavailable");
  
    var selection = [];
  //check all available (empty) tiles and make a random selection out of them
  $( ".tile" ).each(function( index ) {
    
    if( $(this).hasClass("unavailable")){
      
    }else{
      selection.push(this);
    }
    
  });
  
  
  var machineMove = Math.floor(Math.random() * (selection.length - 0));
  $(selection[machineMove]).append("O").addClass("unavailable");
   

    //must check if there is a victory already
  //victory conditions: all tiles in the same row have the same html, OR
  //the middle tile of the middle row has the same html as its extreme opposites, OR
  //the tiles that share the same position in each row (1st, 2nd or 3rd) have the same html
  
  //covers third scenario
  for(var m = 0; m < 3; m++){
    if($(tileOrder[m]).html() === $(tileOrder[m+3]).html() &&
       $(tileOrder[m]).html() === $(tileOrder[m+6]).html() && $(tileOrder[m]).hasClass("unavailable") ){
        if($(tileOrder[m]).html() === "o"){
          showPopUp(".defeats"); 
        }else{
          showPopUp(".victories");
        }
    }
  }
    
  
  // this covers the second scenario
  if($(tileOrder[4]).html() === $(tileOrder[8]).html() && 
     $(tileOrder[4]).html() === $(tileOrder[0]).html() && $(tileOrder[0]).hasClass("unavailable") ||
     $(tileOrder[4]).html() === $(tileOrder[6]).html() &&
     $(tileOrder[4]).html() === $(tileOrder[2]).html() && $(tileOrder[2]).hasClass("unavailable")){
        if($(tileOrder[4]).html() === "o"){
          showPopUp(".defeats"); 
        }else{
          showPopUp(".victories");
        }
     }
  
  
  var count = 0;
  
  //this covers the first scenario
  var onePerRow = [tileOrder[0], tileOrder[3], tileOrder[6]];
  for(var i = 0; i < onePerRow.length; i++){
    var answer = $(onePerRow[i]).html();
    $(onePerRow[i]).siblings().each( function () {
      if(answer !== $(this).html() || answer == ""){
        //alert("not this time");
        return false;  
      }
      count++;
      if(count == 2){
        if($(this).html() === "o"){
          showPopUp(".defeats"); 
        }else{
          showPopUp(".victories");
        }
      }
    });
  }
  
  function showPopUp(result){
    if(result == "victories"){
      $(".popup h3").empty().append("You Win!");
    }else if(result == "defeats"){
      $(".popup h3").empty().append("You Lose!");
    }else{
      $(".popup h3").empty().append("Draw!");
    }
    $(".popup").show();
    $(result).find("p").empty().append( parseInt($(result).find("p").html())+1 );
  }
  
  $("button").on("click", function(){
    $(".popup").hide();
    victory();
  });
 
  function victory(){
    console.log("victory");
    for(var j= 0; j < tileOrder.length; j++){
      $(tileOrder[j]).removeClass("unavailable");
      $(tileOrder[j]).empty();
    }
  }
  
});