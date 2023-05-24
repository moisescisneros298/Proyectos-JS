// Variables
const resultado = document.querySelector('#resultado');

const year = document.querySelector('#year');
const max = new Date().getFullYear();
const min = max - 13;

console.log(max)
console.log(min)

// Evemtos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(); // Muestra los autos al cargar

    // Llena las opciones de años
    llenarSelect();
} )

// Funciones
function mostrarAutos() {
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Preció: ${precio} - Color: ${color}
        `

        // Insertar en el HTML
        resultado.appendChild(autoHTML)
    });
}

// Genera los años de losa utos
function llenarSelect() {

    for(let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agregar las opciones de año al selecr
    }

}