const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffeledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffeledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}


function setNextQuestion() {
    resetState()
    showQuestion(shuffeledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerHTML = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click' , selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffeledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2+2?',
        answers:[
            { text: '4', correct: true  },
            { text: '22', correct: false  }
        ]
    },
    {
        question: 'Who has the most subscribers in Youtube?',
         answers:[
             { text: 'T-Series', correct: true  },
             { text: 'PewDiePie', correct: false  },
             { text: 'KSI', correct: false },

    ]},
    {
        question: 'Is it hard to find a job in programming?',
        answers:[
            {text : 'No, its not', correct: false},
            {text : 'Yes, its really hard', correct : true}
        ]
    },
    {
        question: 'Is Kosovo a good country to live in?',
        answers:[
            {text: 'Yes, Kosovo is a great country to live in', correct: true},
            {text: 'No, Kosovo is meh', correct: false}
        ]


    }
    
]