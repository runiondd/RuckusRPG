// ------------------------ Game Functions are below ------------------------
$(document).ready(function () {
	var url = window.location.search;
	if (url.indexOf("?charID=") !== -1) {
		charID = url.split("=")[1];
	}
	var currentCharacter = {
			id: charID,
			name: "",
			reputation: 0,
			knowlege: 0,
			sanity: 0
		}; 

	// get the Character's Attributes from the database and display on the screen
	updatePlayerAttributesView();
	// hang events on the "next" buttons
	$("#next1").on("click", function () {
		handleQuestionSelection("question1");
	});
	$("#next2").on("click", function () {
		handleQuestionSelection("question2");
	});
	$("#next3").on("click", function () {
		handleQuestionSelection("question3");
	});
	$("#next4").on("click", function () {
		handleQuestionSelection("question4");
	});
	$("#next5").on("click", function () {
		handleQuestionSelection("question5");
	});
	$("#next6").on("click", function () {
		handleQuestionSelection("question6");
	});

	// Intialize the game with hidden Divs
	$("#question1").show();
	$("#question2").hide();
	$("#question3").hide();
	$("#question4").hide();
	$("#question5").hide();
	$("#question6").hide();

	function handleQuestionSelection(gameQuestion) {			
	//show/hide the correct questions 
		switch(gameQuestion) {
			case "question1":
				currentCharacter.knowlege++;
				currentCharacter.sanity--;
				currentCharacter.power++;
				updateCharacter(currentCharacter.id, currentCharacter.knowlege, currentCharacter.sanity, currentCharacter.power)
				$(".stepImage").attr("src", "images/nick_the_lounge_singer.jpg");
				$("#question1").hide();
				$("#question2").show();
				$("#question3").hide();
				$("#question4").hide();
				$("#question5").hide();
				$("#question6").hide();
				break;
			case "question2":
				//adjust currentCharacter's attributes for choices
				//call updateCharacter() 
				$(".stepImage").attr("src", "images/McGill_Stapler.jpg");
				$("#question1").hide();
				$("#question2").hide();
				$("#question3").show();
				$("#question4").hide();
				$("#question5").hide();
				$("#question6").hide();
				break;
			case "question3":
				$(".stepImage").attr("src", "images/tuxedo_cake.jpg");
				$("#question1").hide();
				$("#question2").hide();
				$("#question3").hide();
				$("#question4").show();
				$("#question5").hide();
				$("#question6").hide();
				break;
			case "question4":
				$(".stepImage").attr("src", "images/copier.png");
				$("#question1").hide();
				$("#question2").hide();
				$("#question3").hide();
				$("#question4").hide();
				$("#question5").show();
				$("#question6").hide();
				break;
			case "question5":
				$(".stepImage").attr("src", "images/dont-make-me-go-all-caps-on-you.jpg" );
				$("#question1").hide();
				$("#question2").hide();
				$("#question3").hide();
				$("#question4").hide();
				$("#question5").hide();
				$("#question6").show();
				break;
			case "question6":
				$("#question1").hide();
				$("#question2").hide();
				$("#question3").hide();
				$("#question4").hide();
				$("#question5").hide();
				$("#question6").show();
				break;
			default:
				//this should log an error **TODO**
				break;
		}
		return;
	}

	function updateCharacter(charID, knowlege, sanity, power) {
		alert("Update Character");

		var updatedCharacter = {
			id: charID,
			power: power,
			knowlege: knowlege,
			sanity: sanity
		};   

		updateCharacter.power = power;
		updateCharacter.knowlege = knowlege;
		updateCharacter.sanity = sanity;

		$.ajax({
			method: "PUT",
			url: "/api/updateCharacter",
			data: updatedCharacter
		}).then(updatePlayerAttributesView());
	}

	function updatePlayerAttributesView() {
		alert("Update View");
		$.get("/api/character/" + currentCharacter.id, function (data) {
			$("#characterName").text(data[0].name);
			$("#characterPower").text(data[0].power);
			$("#characterKnowledge").text(data[0].knowlege);
			$("#characterSanity").text(data[0].sanity);

			//update the currentCharacter obj to be used by the rest of the app
			currentCharacter.name = data[0].name;
			currentCharacter.power = data[0].power;
			currentCharacter.knowlege = data[0].knowlege;
			currentCharacter.sanity = data[0].sanity;
		})
	}

	// Function to be run after the timer is up
	function endGame() {
		alert("end game");
		// Show the completed Score Div
		$("#end_container").show();

		// Set Scroll position so it looks good
		window.scrollTo(0, 550);
	}

});