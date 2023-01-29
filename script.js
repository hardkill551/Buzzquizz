let id = "";
let quizzList="";
getQuizzes();
let createQuiz = {}
let questionsAll = []
let amountQuestions;
let amountLevels;
let count = 1
let questions;
let quizzId;
let quizzResponse;
let localStorageList = [];
let getString;



localStorageQuizz(1)


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
    window.scrollTo(0,0);
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
        <div class="answer scroll">
        </div>`

        color = document.querySelectorAll('.title')
        color[i].style.background = `${questions[i].color}`

        answers = document.querySelectorAll('.answer');

        for(let a = 0; a < questions[i].answers.length; a++){
            
            if(questions[i].answers[a].isCorrectAnswer == true){
            answers[i].innerHTML += 
            `
            <div class="true answers" onclick="answerQuestions(this)">
            <img src="${questions[i].answers[a].image}">
            <h2>${questions[i].answers[a].text}</h2>
            </div>
            
            `
            } else {
                answers[i].innerHTML += 
                `
                <div class="false answers" onclick="answerQuestions(this)">
                <img src="${questions[i].answers[a].image}">
                <h2>${questions[i].answers[a].text}</h2>
                </div>
                
                `
            }
        } 
        answers[i].innerHTML += `</div>`
    }

}

let c = 0;
let i = 0;

function answerQuestions(element){
    
    let answer = document.querySelectorAll('.answers');
    let d = 0;

        while(d < questions[c].answers.length){
            if(answer[i].classList.contains('true')){
                answer[i].classList.add('certo')
                answer[i].classList.add('opacity')
                answer[i].classList.add('disabled')
            } else {
                answer[i].classList.add('opacity')
                answer[i].classList.add('errado')
                answer[i].classList.add('selected')
                answer[i].classList.add('disabled')
            }
    
            i++;
            d++;
        }

    c++
    element.classList.remove('opacity')
    
    
    setTimeout(function scrollPage(){
        const elementoQueQueroQueApareca = document.querySelector('.scroll');
        elementoQueQueroQueApareca.scrollIntoView();
        elementoQueQueroQueApareca.classList.remove('scroll')
    }, 2000)
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
    document.querySelector("main .quiz_creation:nth-child(4)").innerHTML += `<h2>Seu quizz está pronto!</h2>
    <div onclick="forTheQuizz()" class="img_potterhead">
        <img src="${quizzImage}" alt="">
        <p>${quizzTitle}</p>
    </div>
    <button onclick="forTheQuizz()" class="button_acess">Acessar quiz</button>
    <button onclick="forTheHome()"class="button_home">Voltar para home</button>`

    for (let i = 0; i<amountLevels-1;i++){
        document.querySelector("main .quiz_creation:nth-child(3)").innerHTML += `
        <ul  onclick="validateLevels()" class="other_question">
        <h3>Nível ${[i+2]}</h3>
        <img src="images/Vector.png" alt="">
    </ul>`
    }
    document.querySelector("main .quiz_creation:nth-child(2)").innerHTML += `
    <button onclick="validate()">Prosseguir pra criar níveis</button>`
    document.querySelector("main .quiz_creation:nth-child(3)").innerHTML += `
    <button onclick="validateLv()" class="button_finish">Finalizar quiz</button>`
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
    }
    let answersAll = []
if (ct==1){
        answersAll = {
            text: answerWrong1,
            image: ImageWrong1,
            isCorrectAnswer:false
        }
    }
if (ct==2){
    answersAll = {
        text: answerWrong1,
        image: ImageWrong1,
        isCorrectAnswer:false
    },
        {
            text: answerWrong2,
            image: ImageWrong2,
            isCorrectAnswer:false
        }
}
if (ct==3){
    answersAll = {
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
        }
    }
    questionsAll = 
		{
			title: questionTitle,
			color: colorQuestion,
			answers: [
				{
					text: answerCorrect,
					image: imageCorrect,
					isCorrectAnswer: true
				},
                answersAll
			]
		},
	
    createQuiz.questions.push(questionsAll)
    count++
    document.querySelector(".box_question h3").innerHTML = `<h3>Pergunta ${count}</h3>`
    let node = document.querySelector("main .quiz_creation:nth-child(2) ul:nth-child(3)");
    try {
      node.parentNode.removeChild(node);
    }
    catch(err){
        return
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
}

function validate(){
    if (createQuiz.questions.length==amountQuestions-1){
        validateQuestion()
    }
    if (createQuiz.questions.length==amountQuestions){
        document.querySelector('main .quiz_creation:nth-child(2)').classList.add('hidden')
        document.querySelector('main .quiz_creation:nth-child(3)').classList.remove('hidden')
    }
    else{
        alert("Você precisar preencher todas perguntas")
    }
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
    leveis = {
        title: levelTitle,
        image: imageLevel,
        text: levelDescription,
        minValue: minimumPercent
    }
    createQuiz.levels.push(leveis)
    count = 1
    count++
    document.querySelector(".levels h3").innerHTML = `<h3>Nível ${count}</h3>`
    let node = document.querySelector("main .quiz_creation:nth-child(3) ul:nth-child(3)");
    try {
      node.parentNode.removeChild(node);
    }
    catch(err){
        return
    }
    document.querySelector(".levels textarea:nth-child(2)").value = ""
    document.querySelector(".levels textarea:nth-child(4)").value = ""
    document.querySelector(".levels textarea:nth-child(6)").value = ""
    document.querySelector(".levels textarea:nth-child(8)").value = ""
    window.scrollTo(0, 0)
}

function validateLv(){
    for (let i = 0;i<createQuiz.levels.length;i++){
        if (createQuiz.levels[i].minValue == 0 || document.querySelector(".levels textarea:nth-child(4)").value == 0){
            break
        }
        else{
            alert("Você precisa de pelo menos um level com 0%")
            return
        }
        }
    if (createQuiz.levels.length==amountLevels-1){
        validateLevels()
    }
    if (createQuiz.levels.length==amountLevels){
        document.querySelector('main .quiz_creation:nth-child(3)').classList.add('hidden')
        document.querySelector('main .quiz_creation:nth-child(4)').classList.remove('hidden')
        saveQuiz()
    }
    else{
        alert("Você precisar preencher todos os níveis")
    }
}

function saveQuiz(){
    count = 1
    document.querySelector("main .quiz_creation:nth-child(2)").innerHTML = 
    `<h2>Crie suas perguntas</h2>
                <ul class="box_question">
                    <h3>Pergunta 1</h3>
                    <textarea type="text" placeholder="Texto da pergunta"></textarea>
                    <textarea type="text" class="margin-questions" placeholder="Cor de fundo da pergunta"></textarea>
                    <h3>Resposta correta</h3>
                    <textarea type="text" placeholder="Resposta correta"></textarea>
                    <textarea type="text" class="margin-questions"placeholder="URL da imagem"></textarea>
                    <h3>Respostas incorretas</h3>
                    <textarea type="text" placeholder="Resposta incorreta 1"></textarea>
                    <textarea type="text" class="margin-questions"placeholder="URL da imagem 1"></textarea>
                    <textarea type="text" placeholder="Resposta incorreta 2"></textarea>
                    <textarea type="text" class="margin-questions" placeholder="URL da imagem 2"></textarea>
                    <textarea type="text" placeholder="Resposta incorreta 3"></textarea>
                    <textarea type="text" class="margin-questions" placeholder="URL da imagem 3"></textarea>
                </ul>`

    document.querySelector("main .quiz_creation:nth-child(3)").innerHTML =
    `<h2>Agora, decida os níveis</h2>
    <ul class="levels">
        <h3>Nível 1</h3>
        <textarea type="text" placeholder="Título do seu nível"></textarea><br>
        <textarea type="text" placeholder="% de acerto mínima"></textarea><br>
        <textarea type="text" placeholder="URL da imagem do nível"></textarea><br>
        <textarea type="text" placeholder="Descrição do nível"></textarea>
    </ul>`

    document.querySelector("main .quiz_creation:nth-child(1)").innerHTML =                
    `<h2>Comece pelo começo</h2>
    <ul class="questions">
        <textarea type="text" placeholder="Título do seu quizz"></textarea><br>
        <textarea type="text" placeholder="URL da imagem do seu quizz"></textarea><br>
        <textarea type="text" placeholder="Quantidade de perguntas do quizz"></textarea><br>
        <textarea type="text" placeholder="Quantidade de níveis do quizz"></textarea>
    </ul>
    <button onclick="validateTitle()">Prosseguir pra criar perguntas</button>`
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", createQuiz)
    promise.then(funcionou)
    promise.catch(naofuncionou)
}

function funcionou(response){
    //console.log(response)
    quizzId=response.data.id
    quizzResponse = response.data
    localStorageQuizz(quizzResponse)
}

function naofuncionou(){
    alert("Não foi salvo")
    return
}

function forTheQuizz(){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)
    promise.then(openQuiz);
    document.querySelector('main .quiz_creation:nth-child(4)').classList.add('hidden')
}

function forTheHome(){
    location.reload()
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
        //console.log(percentual) // shows the percentage of the user's success
        ranks = quizzList.levels
        for(let i=ranks.length-1;0<=i;i--){ //descending loop to store "level" values ​​of the clicked quiz
            //console.log("Entrou no for")
            if (percentual >= ranks[i].minValue){
                //console.log("Entrou no if")
                //console.log(i)
                title = ranks[i].title;
                text = ranks[i].text;
                image = ranks[i].image;
                break
           }
           
        }
        //console.log(ranks) //shows the levels in percentage of success ex: 10,40,80
        //console.log(`${Math.round(percentual)}% de acerto: ${title}`)
        //console.log(image);
        //console.log(text);
    }
}
function localStorageQuizz(v){
    console.log(v)
    if (v!==1){
    // Pega a lista do quizz coloca em uma lista maior, transforma ela em string e armazena no localStorage="local"
    const stringLocalStorageList = JSON.stringify(v)
    console.log(stringLocalStorageList)
    localStorage.setItem(quizzId,stringLocalStorageList); 
    }
    // Pega a variavel no formato string dentro do localStorage e transforma ela em Array novamente
    const keys = Object.keys(localStorage);
    
    for(let i=0; i<keys.length; i++){
        getString = localStorage.getItem(keys[i])
        console.log(getString)
        
        const transformArray = JSON.parse(getString)
        
      
        document.querySelector('.createQuizz').classList.add("hidden")
        document.querySelector('.yourQuizzes').classList.remove("hidden")
        ShowQuizzesOne(transformArray,keys.length)
    
}
}
    
function ShowQuizzesOne(response,tamanho){
    let quizList = response;
    const quizzes = document.querySelector('.downQuizzes')
    
    

        quizzes.innerHTML +=
        `<div class="quizz" onclick="enterQuizz(this)">
            <span class="idQuiz hidden">${quizList.id}</span>
            <h2>${quizList.title} </h2>
            <img src="${quizList.image}">
            <div class="gradient"></div> 
        </div>`

    
    
}