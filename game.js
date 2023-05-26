const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);
const ProgressText = document.getElementById("ProgressText");
const scoreText = document.getElementById("score");

const ProgressBarFull = document.getElementById("progressBarFull");

const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];


fetch(
    'https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        

        startgame();
    })
    .catch((err) => {
        console.error(err);
    });
/*COnstants*/
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startgame = () => {

    questionCounter=0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');

};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    {
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    ProgressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
    ProgressText.innerHTML = `Question : ${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    if(question != null)
    {
        question.innerHTML = currentQuestion.question;
    }

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion[`choice${number}`];

    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswer = true;
    
};

choices.forEach( choice => {
    choice.addEventListener("click" , e =>{
        if(!acceptingAnswer) return ;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectanswer = selectedChoice.dataset["number"];
        
        

        const classToapply = 
            selectanswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToapply === "correct")
        {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToapply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToapply);
            getNewQuestion();
        }, 250);
        

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerHTML = score;
}


