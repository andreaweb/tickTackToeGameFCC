$(".tile").on("click", function(){

  var draw = 0;
  var tileOrder = document.querySelectorAll(".tile");

  //first thing we do is check if the click is valid (tile must be empty)
  if( $(this).hasClass("unavailable") || $(".popup").hasClass("no-more-clicks") ){
    return false; 
  }  

  //if click is valid, we can fill the tile with X
  $(this).append("X").addClass("unavailable"); 

  
  //then we check if there is a victory
  checkVictoryFirstScenario("X");
  
  function addO(){
    var selection = [];
    
    //check all available (empty) tiles and make a random selection out of them
    $(".tile").each(function(index) {
     if( $(this).hasClass("unavailable")){
        draw++;  
        console.log(draw);
      }else{
        selection.push(this);
      }      
    });

    //checks if there's a draw
    if(draw > 7){
      showPopUp(".draws"); 
    }
    
    //machine makes a move in a random tile //-> for the future, I could make the machine more intelligent
    var machineMove = Math.floor(Math.random() * (selection.length - 0));
    $(selection[machineMove]).append("O").addClass("unavailable");

    //checks if machine made a winning move
    checkVictoryFirstScenario("O");
  }
  
  //covers the scenario where tiles that share the same position in each row (1st, 2nd or 3rd) have the same html
  function checkVictoryFirstScenario(move){
    for(var m = 0; m < 3; m++){
      if($(tileOrder[m]).html() === $(tileOrder[m+3]).html() &&
         $(tileOrder[m]).html() === $(tileOrder[m+6]).html() && $(tileOrder[m]).hasClass("unavailable") ){ 
          if($(tileOrder[m]).html() === "O"){
            showPopUp(".defeats"); 
          }else{
            showPopUp(".victories");
          } 
      }else if(m == 2){
        checkVictorySecondScenario(move);
      }
    }

    //victory scenario conditions not met, check next scenario
    
  }
  
  //covers the scenario where middle tile of the middle row has the same html as its extreme opposites
  function checkVictorySecondScenario(move){
    if($(tileOrder[4]).html() === $(tileOrder[8]).html() && 
       $(tileOrder[4]).html() === $(tileOrder[0]).html() && $(tileOrder[0]).hasClass("unavailable") ||
       $(tileOrder[4]).html() === $(tileOrder[6]).html() &&
       $(tileOrder[4]).html() === $(tileOrder[2]).html() && $(tileOrder[2]).hasClass("unavailable")){    
      if(move === "O"){
            showPopUp(".defeats"); 
           
          }else{
            showPopUp(".victories");
          }
    }else{ 
    //victory scenario conditions not met, check next scenario
        checkVictoryThirdScenario(move);
    }
  }   
   
  //covers the scenario where all the siblings (tiles per row) are equal
  function checkVictoryThirdScenario(move){
    var i = 0;
    while(i < 8){
      if($(tileOrder[i]).html() !== "" && $(tileOrder[i]).html() === $(tileOrder[i+1]).html() && 
         $(tileOrder[i]).html() === $(tileOrder[i+2]).html()){
            if(move === "O"){
              showPopUp(".defeats"); 
            }else{
              showPopUp(".victories");  
            }
            return false;
      }
      i = i + 3;
    }
    //no victory happened after human's turn, so the machine can make its move
    if(move === "X"){
      addO(); 
    }
  }
    
 //shows pop up with result and adequately fills the scoreboard
  function showPopUp(result){
    var oldValue = $(result).find("p");
    var updatedValue = parseInt(oldValue.html())+1;
    if(result == ".victories"){
      $(".popup h3").empty().append("You Win!");
    }else if(result == ".defeats"){
      $(".popup h3").empty().append("You Lose!");
    }else{
      $(".popup h3").empty().append("Draw!");
    }
    $(".popup").show().addClass("no-more-clicks");
    $(result).find("p").empty().append( updatedValue );
  }
  
  $("button").on("click", function(){
    $(".popup").hide().removeClass("no-more-clicks");
    nextRound();
  });
 
  //starts next round by emptying all tiles
  function nextRound(){
    console.log( $(".popup h3").html());
    for(var j= 0; j < tileOrder.length; j++){
      $(tileOrder[j]).removeClass("unavailable");
      $(tileOrder[j]).empty();
    }
  }  
});