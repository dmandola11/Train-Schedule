
var config = {
    apiKey: "AIzaSyC7KQcoc7PBn1GcgzwOiLTUm-yyE8i8Lpo",
    authDomain: "train-schedule-100b8.firebaseapp.com",
    databaseURL: "https://train-schedule-100b8.firebaseio.com",
    storageBucket: "train-schedule-100b8.appspot.com",
    messagingSenderId: "329675762204"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrainBtn").on("click", function(){

  	var trainNameInput = $("#trainNameInput").val().trim();
  	var destinationInput = $("#destinationInput").val().trim(); 
  	var timeInput = $("#timeInput").val().trim();
  	var frequencyInput = $("#frequencyInput").val().trim();

  	var newTrain = {
  		name : trainNameInput,
  		destination : destinationInput,
  		time : timeInput,
  		frequency : frequencyInput
  	}

  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.time);
  	console.log(newTrain.frequency);

  	alert("Train Information successfully added");

  	$("#trainNameInput").val("");
  	$("#destinationInput").val("");
  	$("#timeInput").val("");
  	$("#frequencyInput").val("");

  	return false;
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var trainNameInput = childSnapshot.val().name;
  	var destinationInput = childSnapshot.val().destination; 
  	var timeInput = childSnapshot.val().time;
  	var frequencyInput = childSnapshot.val().frequency;

  	console.log(trainNameInput);
  	console.log(destinationInput);
  	console.log(timeInput);
  	console.log(frequencyInput);

    var firstTrain = moment(timeInput, "hh:mm").subtract(1, "years");
    console.log(firstTrain);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    var tDifference = moment().diff(moment(firstTrain), "minutes");
    console.log("Time Difference: " + tDifference);

    var timeRemain = tDifference % frequencyInput;
    console.log(timeRemain);

    var minNextTrain = frequencyInput - timeRemain;
    console.log("Minutes until Next Train: " + minNextTrain);

    var nextTrain = moment().add(minNextTrain, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm")); 

    $("#trainTable > tbody").append("<tr><td>" + trainNameInput + "</td><td>" + destinationInput + "</td><td>" + frequencyInput + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minNextTrain + "</td></tr>");

});