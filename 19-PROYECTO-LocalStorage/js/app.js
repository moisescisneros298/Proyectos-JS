// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// EventListeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
};


// Funciones
function agregarTweet(e){
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validacion 
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return; //Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Crear HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}

// Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3s
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Mustra un listado de los tweets

function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            // Crear el html
            const li = document.createElement('li');

            // Añadir el texto
            li.innerText = tweet.tweet;

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
            console.log(li)
        });
    }
}

// Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}