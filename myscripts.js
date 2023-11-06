var question;
var answer;

function init(){
    question = "角";
    answer = "かど - corner";
    document.getElementById("question").innerHTML = question;
}

function revealAnswer(){
    if(!document.getElementById("answer")){

        //Answer
        let x = document.createElement("p");
        let t = document.createTextNode(answer);
        
        x.id = "answer";
        x.className = "answer";
        x.appendChild(t);
        document.getElementById("center").appendChild(x);
        
        //Nav Buttons
        let remainingText = document.createElement("p");
        let incorrectButton = document.createElement("button");
        let correctButton = document.createElement("button");
        let container = document.createElement("div");

        remainingText.className = "answer";
        incorrectButton.className = "answer";
        correctButton.className = "answer";
        container.className = "bottom";

        remainingText.appendChild(document.createTextNode("Remaining: 000"));
        incorrectButton.appendChild(document.createTextNode("Incorrect: 000"));
        correctButton.appendChild(document.createTextNode("Correct: 000"));
        container.appendChild(remainingText);
        container.appendChild(incorrectButton);
        container.appendChild(correctButton);
        
        document.body.appendChild(container);

    }

    // x.onclick = function() {nextQuestion()};
}

function nextQuestion(){
    question = "角度";
    answer = "かくど - degree of an angle";
    document.getElementById("question").innerHTML = question;
    document.getElementById("answerButton").remove();
}