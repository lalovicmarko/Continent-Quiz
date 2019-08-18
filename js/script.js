var question, question1, question2, question3, question4, question5;
var answer1, answer2, answer3;
var answerPosition = [1, 2, 3];
var answered;
var i = 1;
var randomNumber;
var score = 0;
var scoreListJSON = [];
var currentDate = new Date();
var mm = currentDate.getMonth() + 1;
var dd = currentDate.getDate();
var yyyy = currentDate.getFullYear();
var date = mm + "/" + dd + "/" + yyyy;

var questions = [
	{
		image: "https://i.imgur.com/upu7gMJ.jpg",
		continent: "Antarctica"
	},
	{
		image: "https://i.imgur.com/E7n3P77.jpg",
		continent: "Antarctica"
	},
	{
		image: "https://i.imgur.com/4WgoutD.jpg",
		continent: "Antarctica"
	},
	{
		image: "https://i.imgur.com/rYohooR.jpg",
		continent: "Antarctica"
	},
	{
		image: "https://i.imgur.com/BlrmuXu.jpg",
		continent: "Antarctica"
	},
	{
		image: "https://i.imgur.com/1UINvo8.jpg",
		continent: "Oceania"
	},
	{
		image: "https://i.imgur.com/vWlrNXk.jpg",
		continent: "Oceania"
	},
	{
		image: "https://i.imgur.com/rljU60z.jpg",
		continent: "Oceania"
	},
	{
		image: "https://i.imgur.com/ybRJKnu.jpg",
		continent: "Oceania"
	},
	{
		image: "https://i.imgur.com/zZsesJy.jpg",
		continent: "Oceania"
	},
	{
		image: "https://i.imgur.com/sgqoWwV.jpg",
		continent: "Europe"
	},
	{
		image: "https://i.imgur.com/EdNkLW8.jpg",
		continent: "Europe"
	},
	{
		image: "https://i.imgur.com/sczp9om.jpg",
		continent: "Europe"
	},
	{
		image: "https://i.imgur.com/3uSLMKy.jpg",
		continent: "Europe"
	},
	{
		image: "https://i.imgur.com/xG8dgTl.jpg",
		continent: "Europe"
	},
	{
		image: "https://i.imgur.com/M17BhGr.jpg",
		continent: "North America"
	},
	{
		image: "https://i.imgur.com/7Hm4BDz.jpg",
		continent: "North America"
	},
	{
		image: "https://i.imgur.com/BWwPYCI.jpg",
		continent: "North America"
	},
	{
		image: "https://i.imgur.com/eYQXGwb.jpg",
		continent: "North America"
	},
	{
		image: "https://i.imgur.com/AMVT31C.jpg",
		continent: "North America"
	},
	{
		image: "https://i.imgur.com/nooVXqp.jpg",
		continent: "South America"
	},
	{
		image: "https://i.imgur.com/nLUAr4P.jpg",
		continent: "South America"
	},
	{
		image: "https://i.imgur.com/KV7vPYG.jpg",
		continent: "South America"
	},
	{
		image: "https://i.imgur.com/e73FhAl.jpg",
		continent: "South America"
	},
	{
		image: "https://i.imgur.com/hYlVyom.jpg",
		continent: "South America"
	},
	{
		image: "https://i.imgur.com/erOrAn4.jpg",
		continent: "Asia"
	},
	{
		image: "https://i.imgur.com/RVowloS.jpg",
		continent: "Asia"
	},
	{
		image: "https://i.imgur.com/NPSlyqL.jpg",
		continent: "Asia"
	},
	{
		image: "https://i.imgur.com/khi8hGD.jpg",
		continent: "Asia"
	},
	{
		image: "https://i.imgur.com/VcIFY35.jpg",
		continent: "Asia"
	},
	{
		image: "https://i.imgur.com/nWK7Jlh.jpg",
		continent: "Africa"
	},
	{
		image: "https://i.imgur.com/GYJlsrp.jpeg",
		continent: "Africa"
	},
	{
		image: "https://i.imgur.com/QBo4Huk.jpg",
		continent: "Africa"
	},
	{
		image: "https://i.imgur.com/G1kpBhT.jpg",
		continent: "Africa"
	},
	{
		image: "https://i.imgur.com/FlaF0bx.jpg",
		continent: "Africa"
	}
];


function init() {
	
	if (window.localStorage.getItem("scoreListLocal") == null) {	
		
		var scoreList =
					[{listScore:0, listDate: date},
					 {listScore:0, listDate: date},
					 {listScore:0, listDate: date}];

		scoreList.sort(function(a, b){return b.listScore - a.listScore;});

		var scoreListString = JSON.stringify(scoreList);

		localStorage.setItem("scoreListLocal", scoreListString);

		scoreListJSON = JSON.parse(localStorage.getItem("scoreListLocal"));
		
	}else{
		
		scoreListJSON = JSON.parse(localStorage.getItem("scoreListLocal"));
	}
	
	for (var l = 0; l < scoreListJSON.length; l++) {
		
		scoreSort();
		
		document.getElementById("scoreDate" + (l + 1)).innerHTML = scoreListJSON[l].listDate;
		document.getElementById("pointsPlace" + (l + 1)).innerHTML = numberWithCommas(scoreListJSON[l].listScore);
		
	}
}
init();

function shuffle(array) {
	
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;
	
	while (0 !== currentIndex) {
		
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	
	return array;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function newGame() {
	
	i = 1;
	score = 0;
	
	nextQuestion();
	
	document.getElementById("main-quiz").style.display = "block";
	document.getElementById("result-list").style.display = "none";
}

function randomQuestion() {
	
	randomNumber = Math.floor(Math.random() * questions.length);
	question = questions[randomNumber];
	
	answer1 = question;
	
	do {
		randomNumber = Math.floor(Math.random() * questions.length);
		answer2 = questions[randomNumber];
		
	} while (answer2.continent == question.continent);
		
	do {
		randomNumber = Math.floor(Math.random() * questions.length);
		answer3 = questions[randomNumber];
		
	} while (answer3.continent == answer2.continent ||	answer3.continent == question.continent);
}

function printQuestion() {
	
	document.getElementById("continent-img").src = question.image + ".png";
	
	answerPosition = shuffle(answerPosition);
	
	document.getElementById("continent-name" + answerPosition[0]).innerHTML = answer1.continent;
	document.getElementById("continent-name" + answerPosition[1]).innerHTML = answer2.continent;
	document.getElementById("continent-name" + answerPosition[2]).innerHTML = answer3.continent;
	
	answered = 1;
	
	document.getElementById("next").style.display = "none";	
}

function answer(x) {
	
	if (answered == 1) {
		
		document.getElementById("answer" + x).style.backgroundColor = "#ffb63e";
		document.getElementById("sign" + x).src = "css/sign/sign-white.png";
		document.getElementById("continent-name" + x).style.color = "#fff";

		if (document.getElementById("continent-name" + x).textContent == question.continent) {
			
			document.getElementById("yes" + x).style.display = "inline";
			score += 750;
			
		} else {
			
			document.getElementById("yes" + answerPosition[0]).style.display = "inline";
			document.getElementById("no" + x).style.display = "inline";
		}
		
		document.getElementById("next").style.display = "block";
	}
	
	answered = 0;
}

function cssClear() {
	
	for (j = 1; j <= 3; j++) {
		
		document.getElementById("sign" + j).src = "css/sign/sign-yellow.png";
		document.getElementById("answer" + j).style.backgroundColor = "#fff";
		document.getElementById("answer" + j).style.borderColor = "#ffb63e";
		document.getElementById("continent-name" + j).style.color = "#000";
		document.getElementById("yes" + j).style.display = "none";
		document.getElementById("no" + j).style.display = "none";
	}
}

function nextQuestion() {
	
	cssClear();
	
	switch (i) {
		case 1:	
			randomQuestion();
			question1 = question;
			
			printQuestion();
			document.getElementById("question-number").innerHTML = i;
			i++;			
		break;

		case 2:	
			do {
				randomQuestion();
				question2 = question;
			} while (question2 == question1);
			
			printQuestion();
			document.getElementById("question-number").innerHTML = i;
			i++;	
		break;

		case 3:	
			do {
				randomQuestion();
				question3 = question;
			} while (question3 == question1 || question3 == question2);
			
			printQuestion();
			document.getElementById("question-number").innerHTML = i;
			i++;
		break;

		case 4:
			do {
				randomQuestion();
				question4 = question;
			} while (
				question4 == question1 ||
				question4 == question2 ||
				question4 == question3);
			
			printQuestion();
			document.getElementById("question-number").innerHTML = i;
			i++;
		break;

		case 5:
			do {
				randomQuestion();
				question5 = question;
			} while (question5 == question1 ||
					 question5 == question2 ||
					 question5 == question3 ||
					 question5 == question4);
			
			printQuestion();
			document.getElementById("question-number").innerHTML = 5;
			i++;
		break;

		case 6:
			document.getElementById("main-quiz").style.display = "none";
			document.getElementById("finish").style.display = "block";
			document.getElementById("total-score").innerHTML = numberWithCommas(score);
		break;
	}
}

function finish() {
	
	document.getElementById("result-list").style.display = "block";
	document.getElementById("finish").style.display = "none";
	
	scoreSort();
	
	for (var l = 0; l < scoreListJSON.length; l++) {
		
		document.getElementById("pointsPlace" + (l + 1)).innerHTML = numberWithCommas(scoreListJSON[l].listScore);
		document.getElementById("scoreDate" + (l + 1)).innerHTML = scoreListJSON[l].listDate;
	}
}

function scoreSort() {
	
	var newScore= {"listScore": score, "listDate": date};

	scoreListJSON.push(newScore);	
	scoreListJSON.sort(function(a, b){return b.listScore - a.listScore;});
	scoreListJSON.pop();

	var scoreListToString = JSON.stringify(scoreListJSON);
	localStorage.setItem("scoreListLocal", scoreListToString); 
}