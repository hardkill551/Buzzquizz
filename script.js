let id = "";
let quizzList="";
getQuizzes();
let createQuiz = {}
let pergunta = []
let amountQuestions;
let amountLevels;
let contador = 1

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
        questions[i].answers.sort(shuffle);
        topQuizz.innerHTML +=
        ` <div class="firstQuestion">

        <div class="title">
            <h1>${questions[i].title}</h1>
        </div>
        <div class="answer">
        </div>`

        color = document.querySelectorAll('.title')
        color[i].style.background = `${questions[i].color}`

        answers = document.querySelectorAll('.answer');

        for(let a = 0; a < questions[i].answers.length; a++){
            answers[i].innerHTML += 
            `
            <div class="answers">
            <img src="${questions[i].answers[a].image}">
            <h2>${questions[i].answers[a].text}</h2>
            </div>
            
            `
        }
    }

function shuffle() { 
    return Math.random() - 0.5; 
}

function createQuizz(){
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.quiz_creation').classList.remove('hidden')
}

function validateTitle(){
    let quizzTitle = document.querySelector(".questions textarea:first-child").value
    let quizzImage = document.querySelector(".questions textarea:nth-child(3)").value
    amountQuestions = document.querySelector(".questions textarea:nth-child(5)").value
    amountLevels = document.querySelector(".questions textarea:nth-child(7)").value
    if (quizzTitle.length<20 || quizzTitle.length>65 ){
        alert("Quantia de caracteres inválida, insira uma quantia entre 20 ou 65")
        return
    }
    if(!isURL(quizzImage)){
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
    createQuiz = {
        title: quizzTitle,
	    image: quizzImage,
	    questions: [],
        levels: []
    }
    for (let i = 0; i<amountQuestions-1;i++){
        document.querySelector("main .quiz_creation:nth-child(2)").innerHTML += `
    <ul onclick="validateQuestion()" class="other_question">
    <h3>Pergunta ${[i+2]}</h3>
    <img src="images/Vector.png" alt="">
    </ul>`
    }
    for (let i = 0; i<amountLevels-1;i++){
        document.querySelector("main .quiz_creation:nth-child(3)").innerHTML += `
        <ul  onclick="validateLevels()" class="other_question">
        <h3>Nível ${[i+2]}</h3>
        <img src="images/Vector.png" alt="">
    </ul>`
    }
    document.querySelector("main .quiz_creation:nth-child(2)").innerHTML += `
    <button>Prosseguir pra criar níveis</button>`
    document.querySelector("main .quiz_creation:nth-child(3)").innerHTML += `
    <button class="button_finish">Finalizar quiz</button>`
    document.querySelector('.quiz_creation').classList.add('hidden')
    document.querySelector('main .quiz_creation:nth-child(2)').classList.remove('hidden')
}


function validateQuestion(){
    let questionTitle = document.querySelector(".box_question textarea:nth-child(2)").value
    let colorQuestion = document.querySelector(".box_question textarea:nth-child(3)").value
    let answerCorrect = document.querySelector(".box_question textarea:nth-child(5)").value
    let imageCorrect = document.querySelector(".box_question textarea:nth-child(6)").value
    let answerWrong1 = document.querySelector(".box_question textarea:nth-child(8)").value
    let answerWrong2 = document.querySelector(".box_question textarea:nth-child(10)").value
    let answerWrong3 = document.querySelector(".box_question textarea:nth-child(12)").value
    let ImageWrong1 = document.querySelector(".box_question textarea:nth-child(9)").value
    let ImageWrong2 = document.querySelector(".box_question textarea:nth-child(11)").value
    let ImageWrong3 = document.querySelector(".box_question textarea:nth-child(13)").value
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
    if(!isURL(imageCorrect) || !isURL(ImageWrong1)){
        return
    }
    if (answerWrong2 !== "" || ImageWrong2 !== ""){
        if(!isURL(ImageWrong2) || answerWrong2 === ""){
            return
        }
    }
    if (answerWrong3 !== "" || ImageWrong3 !== ""){
        if(!isURL(ImageWrong3) || answerWrong3 === ""){
            return
        }
    }
    let ct = 1
    if (answerWrong2!==""){
        ct++
    }
    if (answerWrong3!==""){
        ct++
        console.log(ct)
    }
    let aeba = []
if (ct==1){
        aeba = {
            text: answerWrong1,
            image: ImageWrong1,
            isCorrectAnswer:false
        }
    }
if (ct==2){
    aeba = [{
        text: answerWrong1,
        image: ImageWrong1,
        isCorrectAnswer:false
    },
        {
            text: answerWrong2,
            image: ImageWrong2,
            isCorrectAnswer:false
        }]
}
if (ct==3){
    aeba = [{
        text: answerWrong1,
        image: ImageWrong1,
        isCorrectAnswer:false
    },
        {
            text: answerWrong2,
            image: ImageWrong2,
            isCorrectAnswer:false
        },
        {
            text: answerWrong3,
            image: ImageWrong3,
            isCorrectAnswer:false
        }]
    }
    pergunta = [
		{
			title: questionTitle,
			color: colorQuestion,
			answers: [
				{
					text: answerCorrect,
					image: imageCorrect,
					isCorrectAnswer: true
				},
                aeba
			]
		},
	]
    createQuiz.questions.push(pergunta)
    contador++
    document.querySelector(".box_question h3").innerHTML = `<h3>Pergunta ${contador}</h3>`
    let node = document.querySelector("main .quiz_creation:nth-child(2) ul:nth-child(3)");
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
    document.querySelector(".box_question textarea:nth-child(2)").value = "" 
    document.querySelector(".box_question textarea:nth-child(3)").value = ""
    document.querySelector(".box_question textarea:nth-child(5)").value = ""
    document.querySelector(".box_question textarea:nth-child(6)").value = ""
    document.querySelector(".box_question textarea:nth-child(8)").value = ""
    document.querySelector(".box_question textarea:nth-child(10)").value = ""
    document.querySelector(".box_question textarea:nth-child(12)").value = ""
    document.querySelector(".box_question textarea:nth-child(9)").value = ""
    document.querySelector(".box_question textarea:nth-child(11)").value = ""
    document.querySelector(".box_question textarea:nth-child(13)").value = ""
    window.scrollTo(0, 0)
    console.log(createQuiz)

}


function validateLevels(){
    let levelTitle = document.querySelector(".levels textarea:nth-child(2)").value
    let minimumPercent = document.querySelector(".levels textarea:nth-child(4)").value
    let imageLevel = document.querySelector(".levels textarea:nth-child(6)").value
    let levelDescription = document.querySelector(".levels textarea:nth-child(8)").value
    if (levelTitle.length<10){
        alert("Quantia de caracteres inválida, insira um valor maior do que 10")
        return
    }
    if (!isNumber(minimumPercent) || (minimumPercent < 0 || minimumPercent > 100)){
        alert("Insira uma porcentagem entre 0 e 100")
        return
    }
    if(!isURL(imageLevel)){
        return
    }
    if (levelDescription.length<30){
        alert("Quantia de caracteres inválida, insira um valor maior do que 30")
        return
    }
    document.querySelector('main .quiz_creation:nth-child(3)').classList.add('hidden')
    document.querySelector('main .quiz_creation:nth-child(4)').classList.remove('hidden')
}



function isURL(n){
    try {
        let url = new URL(n)
        return true
      } catch(err) {
          alert("Insira uma URL válida")
          return false
      }
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
}