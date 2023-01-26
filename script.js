let id = "";
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
    let quizzList = response.data;
    console.log(quizzList)
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




// Gustavo Aqui


// Gustavo Aqui