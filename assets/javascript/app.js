
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
});