$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Gender:$("#gender").val(),Vert:$("#vert").val(),Place:$("#place").val(),date:$("#date").val(),Pet:$("#pet").val()};
      jobj = JSON.stringify(myobj);
/*      var personName = $("#name").val();
      var nameforCheck;
      nameforCheck = personName.toString();*/
      var uniqueness;
      uniqueness = 1;
    $.getJSON('comment', function(data) {
      console.log(data);
      var uniqueness;
      uniqueness = 1;
      for(var comment in data) {
	var everything;
        com = data[comment];
        everything = "{\"Name\":\"" + com.Name + "\",\"Gender\":\"" + com.Gender + "\",\"Vert\":\"" + com.Vert + "\",\"Place\":\"" + com.Place + "\",\"date\":\"" + com.date + "\",\"Pet\":\"" + com.Pet + "\"}";
	if(jobj == everything){
	  uniqueness = 0;
	}
	console.log(everything);
	console.log(jobj);
      }
    })

    if(uniqueness == 1){
      var url = "comment";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
        }
      })
    }
    else alert("This person already exist");
  });

  $("#getComments").click(function() {
   var statss = document.getElementById('quickstart-sign-in-status').textContent;
   if(statss == 'Signed in'){
   var myobj = {Name:$("#name").val(),Gender:$("#gender").val(),Vert:$("#vert").val(),Place:$("#place").val(),date:$("#date").val(),Pet:$("#pet").val()};
    jobj = JSON.stringify(myobj);

      var url = "comment";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
        }
      })



    $.getJSON('comment', function(data) {
      console.log(data);
      var hightestScore = 0;
      for(var comment in data) {
	var com = data[comment];
        var currentScore = 0;
       if(com.Name != ""){
        if(com.Name == $("#name").val()){
	  if(com.Gender != $("#gender").val()){
            if(com.Vert == $("#vert").val()){
              currentScore++;
            }
            if(com.Place == $("#place").val()){
              currentScore++;
            }
            if(com.date == $("#date").val()){
              currentScore++;
            }
            if(com.Pet == $("#Pet").val()){
              currentScore++;
            }
          }
        }
	else {
	  if(com.Vert == $("#vert").val()){
              currentScore++;
            }
            if(com.Place == $("#place").val()){
              currentScore++;
            }
            if(com.date == $("#date").val()){
              currentScore++;
            }
            if(com.Pet == $("#Pet").val()){
              currentScore++;
            }
        }
       if(currentScore > hightestScore){
         var everything;
         everything += "<p>Your best Match:"
         everything += "<p>  Name: " + com.Name + "</p>"; 
         everything += "<p>  Gender: " + com.Gender + "</p>";
         everything += "<p>  For getting relaxed: " + com.Vert + "</p>";
         everything += "<p>  For palce to live: " + com.Place + "</p>";
         everything += "<p>  For dating preference: " + com.date + "</p>";
         everything += "<p>  For pet preference: " + com.Pet + "</p>";
         everything += "<p>How well you two match?";  
         if(currentScore == 4){
           everything += "  100%</p>";
         }
         if(currentScore == 3){
           everything += "  75%</p>";
         }
         if(currentScore == 2){
           everything += "  50%</p>";
         }
         if(currentScore == 1){
           everything += "  25%</p>";
         }
         if(currentScore == 0){
           everything += "  0%</p>";
         }
         $("#comments").html(everything); 
         hightestScore = currentScore;
         currentScore = 0;
       }
       currentScore = 0;}
      }
    })
   }
   else{
   alert("please sign in first");
   }
  })

  $("#deleteComments").click(function(){
    var url = "comment";
    $.ajax({
      url: url,
      type: "DELETE",
      success: function(){
   
      }

    })
  });

});
