// Select Elements
let countSpan = document.querySelector('.count span'),
    bulletSpanContainer = document.querySelector('.bullets .spans'),
    quizArea = document.querySelector('.quiz-area'),
    answersArea = document.querySelector('.answers-area'),
    submitButton = document.querySelector('.submit-button'),
    resultsContainer = document.querySelector(".results"),
    bullets = document.querySelector(".bullets");


// Set Option
let currentIndex=0;
let rightAnswers = 0;

function getQuestions(){
    let myRequest = new XMLHttpRequest();
    
    myRequest.onreadystatechange = function(){
        
        if(this.readyState===4&&this.status===200){
            let qustionOpject = JSON.parse(this.responseText),
                qustionCount = qustionOpject.length;
            createBullets(qustionCount);
            
            // add Question Data
            addQuestionData(qustionOpject[currentIndex],qustionCount);

            //Click On submit
            submitButton.onclick=()=>{

            // Get Right Answer 
            let rightAnswer = qustionOpject[currentIndex].right_answer;

            // increase index
            currentIndex++;

            //check Answer
            check(rightAnswer,qustionCount);

            // Remove Previous Question
            quizArea.innerHTML = "";
            answersArea.innerHTML = "";

            // add Question Data
            addQuestionData(qustionOpject[currentIndex],qustionCount);

            //Handle Bullets Class
            handleBullets();

            // Show Results
            showResults(qustionCount);
                
            };
            
            
           
        }
    };
    myRequest.open("GET","quiz.json",true);
    myRequest.send();
}
getQuestions();

function createBullets(num){
    countSpan.innerHTML=num;
    for(let i=0;i<num;i++){
        
        // Create Bullet 
        let bullet = document.createElement('span');
        
        //apend bullet to spans
        bulletSpanContainer.appendChild(bullet);
        if(i==0){
            bullet.className='on';
        }
    }
}
function addQuestionData(obj,count){
    if(currentIndex<count){
          //Create H2 Qustion Title
    let qustionTitle = document.createElement('h2');
    
    //Create Qustion Text
    let qustionText = document.createTextNode(obj['title']);
    
    //Append Text To h2
    qustionTitle.appendChild(qustionText);
    
    //Append H2 To Quiz Area
    quizArea.appendChild(qustionTitle);
    
    //Create The Answers
    for(let i=1;i<=4;i++){
        
        //Create Main Answer Div
        let mainDiv = document.createElement('div');
        
        //Add Class To Main input
        mainDiv.className='answer';
        
        //Create Radio Input
        let radioInput = document.createElement('input');
        
        //Add Type + Name + Id + Data_attribute
        radioInput.name = 'question';
        radioInput.type = 'radio';
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];
        
        // Create Label
        let theLabel = document.createElement('label');
        
        //Add for attribute
        theLabel.htmlFor = `answer_${i}`;
        
        //Create Label Text 
        let theLabelText = document.createTextNode(obj[`answer_${i}`]);
        
        //Add The Text To Label
        theLabel.appendChild(theLabelText);
        
        // Add input + Label To Main Div
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);
        
        //append All divs To answers Area
        answersArea.appendChild(mainDiv);
        
    }
    
    }
  
}
function check(rAnswer,count){
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
  
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}
function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}











