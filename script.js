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
    console.log(response)
    document.querySelector('.container').classList.add('hidden')
}

function createQuizz(){
    document.querySelector('.container').classList.add('hidden')
    document.querySelector('.quiz_creation').classList.remove('hidden')
}
// Gustavo Aqui


// Gustavo Aqui