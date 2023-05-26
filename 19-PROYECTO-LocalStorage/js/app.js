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

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validacion 
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return; //Evita que se ejecuten mas lineas de codigo
    }

    console.log('agregando tweet')
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