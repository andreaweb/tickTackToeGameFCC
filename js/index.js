$(".tile").on("click", function(){

  var draw = 0;
  var tileOrder = document.querySelectorAll(".tile");

  if( $(this).hasClass("unavailable") || $(".popup").hasClass("no-more-clicks") ){
    return false; //first thing we do is check if the click is valid (tile must NOT have something already)
  }  

  $(this).append("X").addClass("unavailable"); //if click is valid, we can fill the tile with X

  //then we check if there is a victory
  checkVictory();

  //if not, the machine can make its move
  addO();
  
  //then we check for a draw -> must happen BEFORE checkVictory(), otherwise it overwrites it
  checkDraw();
  
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

  function checkVictory(){//current issue: need to get out of this function after first showPopUp is called
    //covers the tiles that share the same position in each row (1st, 2nd or 3rd) have the same html
    for(var m = 0; m < 3; m++){
      if($(tileOrder[m]).html() === $(tileOrder[m+3]).html() &&
         $(tileOrder[m]).html() === $(tileOrder[m+6]).html() && $(tileOrder[m]).hasClass("unavailable") ){
        console.log("1");  
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
      console.log("2");    
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
        if(count > 2){
          console.log("3");
          if($(this).html() === "O"){
            showPopUp(".defeats"); 
          }else{
            showPopUp(".victories");
          }
        }
      });
    }
  }
  
  function checkDraw(){
    //checks if there's a draw
    if(draw > 7){
      showPopUp(".draws"); 
    }
  }
    
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