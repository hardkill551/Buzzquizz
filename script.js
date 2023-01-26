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
        `<div onclick="enterQuizz(this)">
            <span class="idQuiz">${quizList[i].id}</span>
            <h1>${quizList[i].title} </h1>
            <img src="${quizList[i].image}"> 
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
}
// Gustavo Aqui


// Gustavo Aqui