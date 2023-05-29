// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// EventListeners
eventListeners();

function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets)
        crearHTML()
    })
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
            // Agregar un botn de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);  
            }

            // Crear el html
            const li = document.createElement('li');

            // Añadir el texto
            li.innerText = tweet.tweet;

            // Adignar el boton 
            li.appendChild(btnEliminar);

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
            console.log(li)
        });
    }

    sincronisarStorage();
}

// Agrega los tweets actuales
function sincronisarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar tweet 
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
}

// Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}