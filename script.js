// [] - list

const quizData = [
    {
        question: "what base is used for makeup?",
        options: ["foundation", "concealer", "primer", "toner"],
        answer: "primer"
    },

    {
        question: "what is the world's smallest country?",
        options: ["monaco", "liechtenstein", "seychelles", "vatican city"],
        answer: "vatican city"
    },

    {
        question: "which company's ceo is the richest person in the world?",
        options: ["spaceX", "bmw", "yamaha", "mcdonald's"],
        answer: "spaceX"
    },

    {
        question: "what is the 10000th digit of pi?",
        options: ["4", "5", "6", "7"],
        answer: "7"
    },

    {
        question: "what is the most common name for boys?",
        options: ["jonathan", "james", "henry", "alex"],
        answer: "james"
    },

];


const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const timerElement = document.getElementById('timer')
const timerText = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const optionsElement = document.getElementById('options-container');
const resultElement = document.getElementById('result');

progressBar.style.width = '0%';

let currentQuestion = 0;
let score = 0;


startButton.addEventListener('click', startQuiz);

function startQuiz()
{
    startButton.style.display = 'none'
    loadQuestion();
}

function loadQuestion()
{
    clearInterval(timer);

    if(currentQuestion < quizData.length)
    {
        //update progress bar
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

        // create a variable for the current question
        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;

        // Set initial countdown value
        timerText.textContent = 15;

        optionsElement.innerHTML = '';

        //clone 4 option buttons here
        currentQuizData.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn')
            optionsElement.appendChild(button);

            button.addEventListener('click', () =>{
                checkAnswer(option);
            })
        });

        // Start the countdown here
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset the timer
                clearInterval(timer);

                // update currentQuestion variable
                currentQuestion++;

                loadQuestion();
            }
        }, 1000);
    } else
    {
        endQuiz()
    }
}


function checkAnswer(option)
{
    //load current qn set
    const currentQuizData = quizData[currentQuestion]

    if(option === currentQuizData.answer)
    {
        score = score + 1
    }

    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++;
    loadQuestion();
}

function endQuiz()
{
    progressBarContainer.style.display = 'none';
    questionElement.textContent = "Quiz has ended! Horray!";
    optionsElement.style.display = 'none';
    timerElement.style.display = 'none';
}
