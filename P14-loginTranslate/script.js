const container = document.querySelector('.container');
const btnRegistrarse = document.getElementById('sign-up-btn');
const btnIniciarSesion = document.getElementById('sign-in-btn');

btnRegistrarse.addEventListener('click',()=>{
    container.classList.add('sign-up-mode')
    console.log('¡Se hizo clic en el botón de registrarse!');
})

btnIniciarSesion.addEventListener('click',() => {
    container.classList.remove('sign-up-mode')
})