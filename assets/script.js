const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById('quiz-container');
const messageElement = document.getElementById ('message');
const timerElement = document.getElementById('timer');
// HTML grabbed to map into functions

//time needed
let timeLeft = 10;
let currentQuestionIndex = 0;

// make up anime related q's - array
const questions = [
{
question: 'What is the name of this character in the background?',
    answers: ['Luffy', 'Nato', ' Itadori', 'Sasaki'],
    correctAnswer: 'Itadori'

},
{
question: 'What power type is Gon Freecss?',
    answers: ['Specialist', 'Transmuter', ' Conjurer', 'Enhancer'],
    correctAnswer: 'Enhancer'
},
{
question: 'Who dat Pokémon ?',
    answers: ['Girtle', 'Rancor', ' Butterfree', ' Echidnerina'],
    correctAnswer: 'Butterfree'
},
{
question: 'What is Zuko after ?',
    answers: ['Hair', 'His Honor', ' Aang', ' A father'],
    correctAnswer: 'His Honor'
}, 

];

//start -->
startButton.addEventListener('click', startQuiz); 

let timer;

function startQuiz(){
startButton.style.display= 'none';
timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent =`Time left: ${timeLeft}`;
if (timeLeft <= 0) {
clearInterval(timer);
endQuiz();
}
    
}, 1000);

showQuestion();
}

//proceeding to set show
let correctAnswer = 0;
    function showQuestion(){
const currentQuestion = questions[currentQuestionIndex];
quizContainer.innerHTML = `<h2>${currentQuestion.question}</h2>`;
currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.addEventListener('click', () => {
        if(answer === currentQuestion.correctAnswer){
            correctAnswer++;
        }
        currentQuestionIndex++;
        messageElement.textContent =" ";
        if( currentQuestionIndex === questions.length){
                endQuiz();
        } else {
            showQuestion();
        }
    });
        quizContainer.appendChild(button);
 } );
}

//collapse curlies to make sure it all renders correct
// Time to bring 'er home

function endQuiz(){
    clearInterval(timer);
    timerElement.textContent = " ";
    const wrongAnswers = questions.length - correctAnswer;
    const gameOverMessage = currentQuestionIndex === questions.length 
    && wrongAnswers === 0 ? 'Congratulations!' : 'Game Over Friend';
    quizContainer.innerHTML = `<h2 class="game-over"> ${gameOverMessage}</h2>
    <p> Your score: ${correctAnswer} correct, ${wrongAnswers} wrong</p>
    <label for="initials"> Enter Your Initials: </label>
    <input type = "text" id = "initials"> 
    <button id= "save-score"> Save Score </button>`;
    const  saveScoreButton = document.getElementById('save-score');
    saveScoreButton.addEventListener("click", () => {
        const initials = document.getElementById("initials").value;
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push({initials, score: timeLeft});
        // forgot to stringify - done
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }); //close sSB click
}

//show them their high scores!
function showHighScores(){
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highScoresList = highScores.map(score => `li ${score.initials} : ${score.score}</li>`).join(" ");
    quizContainer.innerHTML = `<h2 class ="winner"> Winner Circle:</h2><ul> yee yee<ul><ul> 
    ${highScoresList}</ul><button id = "back-button> Back</button>`;
    const backButton = document.getElementById('back-button') ;
backButton.addEventListener('click', ()=>{
    quizContainer.innerHTML = " ";
}
);
    }

//page isnt breaking anymore - typos corrected
// adding highscore button

const highScoresButton = document.createElement('button');
highScoresButton.innerText = "High Score";
highScoresButton.addEventListener('click', showHighScores);
document.body.appendChild(highScoresButton);