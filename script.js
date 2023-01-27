let id = "";
let quizzList="";
getQuizzes();

function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(ShowQuizzes);
}

function ShowQuizzes(response){
    let quizList = response.data;
    const quizzes = document.querySelector('.quizzes')
    quizzes.innerHTML=' '
    
    for(let i = 0 ; i < quizList.length ; i++){

        quizzes.innerHTML +=
        `<div class="quizz" onclick="enterQuizz(this)">
            <span class="idQuiz hidden">${quizList[i].id}</span>
            <h2>${quizList[i].title} </h2>
            <img src="${quizList[i].image}">
            <div class="gradient"></div> 
        </div>`

    }
}

function enterQuizz(divElement){
    id=divElement.querySelector('.idQuiz').innerHTML
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    promise.then(openQuiz);
}

function openQuiz(response){
    quizzList = response.data;
    levels = response.data.levels;
    questions = response.data.questions;
    finalizationQuiz(5);
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.openQuizz').classList.remove('hidden')

    topQuizz = document.querySelector('.quizzPage');
    topQuizz.innerHTML = `<div class="topQuizzPage">
        <div class="gradient-color"></div> 
        <img src="${response.data.image}">
        <h1>${response.data.title}</h1>
    </div>`

    for (let i = 0; i < questions.length; i++) {
        topQuizz.innerHTML +=
        ` <div class="firstQuestion">

        <div class="title">
            <h1>${questions[i].title}</h1>
        </div>
        <div class="answers">
        </div>`

        color = document.querySelectorAll('.title')
        color[i].style.background = `${questions[i].color}`

        answers = document.querySelector('.answers')
        for(let a = 0; a < questions[i].answers.length; a++){
            answers[i].innerHTML += 
            `<div class="answer">
            <img src="${questions[i].answers[a].image}">
            <h2>${questions[i].answers[a].text}</h2>
            </div>
            `
        }
    }

}

function createQuizz(){
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.quiz_creation').classList.remove('hidden')
}

function validateTitle(){
    let quizzTitle = document.querySelector(".questions input:first-child").value
    let quizzImage = document.querySelector(".questions input:nth-child(3)").value
    let amountQuestions = document.querySelector(".questions input:nth-child(5)").value
    let amountLevels = document.querySelector(".questions input:nth-child(7)").value
    if (quizzTitle.length<20 || quizzTitle.length>65 ){
        alert("Quantia de caracteres inválida, insira uma quantia entre 20 ou 65")
        return
    }
    try {
        let url = new URL(quizzImage)
      } catch(err) {
          alert("Insira uma URL válida")
          return
      }
    if (!isNumber(amountQuestions) || amountQuestions<3){
        alert("A quantia de perguntas não pode ser menor do que 3")
        return
    }
    if (!isNumber(amountLevels) || amountLevels<2){
        alert("A quantia de níveis não pode ser menos do que 2")
        return
    }
    document.querySelector('.quiz_creation').classList.add('hidden')
    document.querySelector('main .quiz_creation:nth-child(2)').classList.remove('hidden')
}
function validateQuestion(){
    let questionTitle = document.querySelector(".box_question input:nth-child(2)").value
    let colorQuestion = document.querySelector(".box_question input:nth-child(3)").value
    let answerCorrect = document.querySelector(".box_question input:nth-child(5)").value
    let imageCorrect = document.querySelector(".box_question input:nth-child(6)").value
    let answerWrong1 = document.querySelector(".box_question input:nth-child(8)").value
    let answerWrong2 = document.querySelector(".box_question input:nth-child(10)").value
    let answerWrong3 = document.querySelector(".box_question input:nth-child(12)").value
    let ImageWrong1 = document.querySelector(".box_question input:nth-child(9)").value
    let ImageWrong2 = document.querySelector(".box_question input:nth-child(11)").value
    let ImageWrong3 = document.querySelector(".box_question input:nth-child(13)").value
    let RegExp = /^#[0-9A-F]{6}$/i
    if (questionTitle.length<20){
        alert("Quantia de caracteres inválida, insira um valor maior do que 20")
        return
    }
    if (!RegExp.test(colorQuestion)){
        alert("Código precisa ser em hexadecimal!!")
        return
    }
    if (answerCorrect === "" || answerWrong1 === ""){
        alert("O campo da resposta não pode estar vazio")
        return
    }
    try {
        let url = new URL(imageCorrect)
        let url1 = new URL(ImageWrong1)
      } catch(err) {
          alert("Insira uma URL válida")
          return
      }
    if (answerWrong2 !== "" || ImageWrong2 !== ""){
        try {
            let url = new URL(ImageWrong2)
          } catch(err) {
              alert("Insira uma URL válida")
              return
          }
    }
    if (answerWrong3 !== "" || ImageWrong3 !== ""){
        try {
            let url = new URL(ImageWrong3)
          } catch(err) {
              alert("Insira uma URL válida")
              return
          }
    }
    document.querySelector('main .quiz_creation:nth-child(2)').classList.add('hidden')
    document.querySelector('main .quiz_creation:nth-child(3)').classList.remove('hidden')
}

function validateLevels(){
    let levelTitle = document.querySelector(".levels input:nth-child(2)").value
    let minimumPercent = document.querySelector(".levels input:nth-child(4)").value
    let imageLevel = document.querySelector(".levels input:nth-child(6)").value
    let levelDescription = document.querySelector(".levels input:nth-child(8)").value
}


function isNumber(n) {
    return !isNaN(parseInt(n));
}




// Gustavo Here
function finalizationQuiz(answer){
    let ranks = []
    let title,text,image ="";
    let rightAnswer = 1; // imaginary value that will be filled by the user's correct answers!!!
    let questions = quizzList.questions;
    if (questions.length <= answer){ // it was supposed to be == but I let it run in the test forever!!!
        const percentual = (rightAnswer*100)/questions.length;
        console.log(percentual) // shows the percentage of the user's success
        ranks = quizzList.levels
        for(let i=ranks.length-1;0<=i;i--){ //descending loop to store "level" values ​​of the clicked quiz
            console.log("Entrou no for")
            if (percentual >= ranks[i].minValue){
                console.log("Entrou no if")
                console.log(i)
                title = ranks[i].title;
                text = ranks[i].text;
                image = ranks[i].image;
                break
           }
           
        }
        console.log(ranks) //shows the levels in percentage of success ex: 10,40,80
        console.log(`${Math.round(percentual)}% de acerto: ${title}`)
        console.log(image)
        console.log(text);
    }
}

// Gustavo Here