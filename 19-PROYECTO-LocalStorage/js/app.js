// Variables
const formulario = document.querySelector('#formulario');
const listaYweets = document.querySelector('#lista-tweets');
let tweets = [];

// EventListeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
};


// Funciones
function agregarTweet(e){
    e.preventDefault();

    console.log('Agregando tweet');
}