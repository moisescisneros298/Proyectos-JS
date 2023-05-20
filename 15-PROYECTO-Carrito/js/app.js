// variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');
let articulosCarrito = []; 

cargarEventListeneers();
function cargarEventListeneers() {
    // Cuando agreges un curso presionando "Agregar al carrito"
    listaCurso.addEventListener('click', agregarCurso)
};

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

// Leer el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
    // console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Agregar elementos al arreglo de carrito 
    articulosCarrito = [...articulosCarrito, infoCurso];

    console.log(articulosCarrito);

    carritoHTML()
}

// Muestra el carrito de compras en el html
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML()

    // Recorre el carrito y genera HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}">
            </td>
            <td>
                ${curso.titulo}
            </td>
        `
        // Agrega el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tablebody
function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}