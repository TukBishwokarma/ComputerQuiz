const questions = [
    {
        question: "The Basic architecture of computer was developed by:", 
        answers: [
            { text: "John von Neumann", correct: true }, 
            { text: "Charles Babbage", correct: false },
            { text: "Blaise Pascal", correct: false },
            { text: "Gordon Moore", correct: false },  
        ]
    },
    {
        question: "In how many generations a computer can be classified:", 
        answers: [
            { text: "3", correct: false },  
            { text: "4", correct: false },
            { text: "5", correct: true },
            { text: "6", correct: false },  
        ]
    },
    {
        question: "Computer Virus is a:", 
        answers: [
            { text: "Freeware", correct: false },  
            { text: "Autoware", correct: false },
            { text: "Software", correct: true },
            { text: "Infoware", correct: false }, 
        ]
    },
    {
        question: "The symbols used in an assembly language are:", 
        answers: [
            { text: "codes", correct: false }, 
            { text: "Assembler", correct: false },
            { text: "Mnemonics", correct: true },
            { text: "None of the above", correct: false },  
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
