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

    // Elimina cursos dek carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Resetear el erregllo 
        limpiarHTML() // Eliminamos todo el HTML
    })
};

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        // Elimina del arreglo por el data-id 
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
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

    // Revisa si el elemento ya existe en el carrito 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        // Actualizmos la cantidad 
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else{ 
                return curso; // Retorna los objetos que no son duplicaados
            }
        });
        articulosCarrito = [...cursos]
    } else {
        // Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // Agregar elementos al arreglo de carrito 

    console.log(articulosCarrito);

    carritoHTML()
}

// Muestra el carrito de compras en el html
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML()

    // Recorre el carrito y genera HTML
    articulosCarrito.forEach( curso => {
        const { imagen,titulo,precio,cantidad,id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
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