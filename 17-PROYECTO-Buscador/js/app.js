// Variables
const resultado = document.querySelector('#resultado');

// Evemtos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos();
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