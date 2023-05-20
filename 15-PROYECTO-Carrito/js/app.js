// variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');

cargarEventListeneers();
function cargarEventListeneers() {
    // Cuando agreges un curso presionando "Agregar al carrito"
    listaCurso.addEventListener('click', agregarCurso)
};

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {
        console.log('agregando al carrito---')
    }
}