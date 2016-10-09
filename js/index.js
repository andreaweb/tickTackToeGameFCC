$(".tile").on("click", function(){

  var draw = 0;
  var tileOrder = document.querySelectorAll(".tile");

  if( $(this).hasClass("unavailable") ){
    return false; //first thing we do is check if the click is valid (tile must NOT have something already)
  }  

  $(this).append("X").addClass("unavailable"); //if click is valid, we can fill the tile with X

  //then we check if there is a victory or draw already
  checkVictory();

  if(draw > 7){
    showPopUp(".draws"); 
  }

  //if not, the machine can make its move
  addO();

  //then we check if the machine won
  checkVictory();

  function addO(){
    var selection = [];
    //check all available (empty) tiles and make a random selection out of them
    $( ".tile" ).each(function( index ) {
      
     if( $(this).hasClass("unavailable")){
        draw++;  
        console.log(draw);
      }else{
        selection.push(this);
      }
      
    });
    
    var machineMove = Math.floor(Math.random() * (selection.length - 0));
    $(selection[machineMove]).append("O").addClass("unavailable");
  }

  function checkVictory(){
    //covers the tiles that share the same position in each row (1st, 2nd or 3rd) have the same html
    for(var m = 0; m < 3; m++){
      if($(tileOrder[m]).html() === $(tileOrder[m+3]).html() &&
         $(tileOrder[m]).html() === $(tileOrder[m+6]).html() && $(tileOrder[m]).hasClass("unavailable") ){
          if($(tileOrder[m]).html() === "O"){
            showPopUp(".defeats"); 
          }else{
            showPopUp(".victories");
          }
      }
    }
      
    
    // this covers the middle tile of the middle row has the same html as its extreme opposites
    if($(tileOrder[4]).html() === $(tileOrder[8]).html() && 
       $(tileOrder[4]).html() === $(tileOrder[0]).html() && $(tileOrder[0]).hasClass("unavailable") ||
       $(tileOrder[4]).html() === $(tileOrder[6]).html() &&
       $(tileOrder[4]).html() === $(tileOrder[2]).html() && $(tileOrder[2]).hasClass("unavailable")){
          if($(tileOrder[4]).html() === "O"){
            showPopUp(".defeats"); 
          }else{
            showPopUp(".victories");
          }
    }
    
    
    var count = 0;
    
    //all tiles in the same row have the same html
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
          if($(this).html() === "O"){
            showPopUp(".defeats"); 
          }else{
            showPopUp(".victories");
          }
        }
      });
    }
  }
    
  function showPopUp(result){
    if(result == ".victories"){
      $(".popup h3").empty().append("You Win!");
    }else if(result == ".defeats"){
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
    console.log( $(".popup h3").html());
    for(var j= 0; j < tileOrder.length; j++){
      $(tileOrder[j]).removeClass("unavailable");
      $(tileOrder[j]).empty();
    }
  }
  
});