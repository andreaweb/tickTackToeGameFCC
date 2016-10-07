//must check if tile already has something
$(".tile").on("click", function(){
  if( $(this).hasClass("unavailable") ){
    return false;
  }
  
  //must check if there is a victory already
  //victory conditions: all tiles in the same row have the same html, OR
  //the middle tile of the middle row has the same html as its extreme opposites, OR
  //the tiles that share the same position in each row (1st, 2nd or 3rd) have the same html
//   if($(this).html() !== "" &&
//      $(this).html() === $(this).siblings(".unavailable"[0]).html() &&
//      $(this).html() === $(this).siblings(".unavailable"[1]).html() ){
//     alert("victory happened");
//   }
  
  var tileOrder = document.querySelectorAll(".tile");
  
  
  
  $(this).append("X").addClass("unavailable");
  
  // for(){
  //   $(tileOrder[i]).text();
  // }
  
  
  var answer = $(this).html();
  var count = 0;
  
  //this covers the first scenario
  $(this).siblings().each( function () {
    if(answer !== $(this).html()){
      //alert("not this time");
      return false;  
    }
    count++;
    if(count == 2){
      alert("victory");
    }
  });
  
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
   
  
});