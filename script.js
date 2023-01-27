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
    console.log(quizzList)
    finalizationQuiz(5)
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.openQuizz').classList.remove('hidden')

   /* const template = document.querySelector('.openQuizz')
    template.innerHTML = ''
    
    for(let i = 0 ; i < quizzList.length ; i++){

        template.innerHTML +=
        `<div class="quizzPage">
        <div class="gradient"></div> 
        <img src="${quizzList[i].image}">
        </div>`

    }*/
}

function createQuizz(){
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.quiz_creation').classList.remove('hidden')
}

function validateTitle(){
    let firstinput = document.querySelector(".questions input:first-child").value
    let secondinput = document.querySelector(".questions input:nth-child(3)").value
    let thirdinput = document.querySelector(".questions input:nth-child(5)").value
    let fourthinput = document.querySelector(".questions input:nth-child(7)").value
    if (firstinput.length<20 || firstinput.length>65 ){
        alert("Quantia de caracteres inválida, insira uma quantia entre 20 ou 65")
        return
    }
    try {
        let url = new URL(secondinput)
      } catch(err) {
          alert("Insira uma URL válida")
          return
      }
    if (!isNumber(thirdinput) || thirdinput<3){
        alert("A quantia de perguntas não pode ser menor do que 3")
        return
    }
    if (!isNumber(fourthinput) || fourthinput<2){
        alert("A quantia de níveis não pode ser menos do que 2")
        return
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

// Gustavo Here