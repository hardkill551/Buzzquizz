
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
        `<div>
            <h1>${quizList[i].title} </h1>
            <img src="${quizList[i].image}"> 
        </div>`

    }
}


// Gustavo Aqui


// Gustavo Aqui