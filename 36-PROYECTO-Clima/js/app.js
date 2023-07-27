const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario-addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;
    }


    // Consultar la API
    consultarAPI(ciudad, pais)
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');
    
    if(!alerta){
        // Crear una alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100','border-red-400', 'text-red-400', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block"> ${mensaje}</span>
        `;

        container.appendChild(alerta);

        // Se elimine la alerta en 5s
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consultarAPI(ciudad, pais){
    const appId = '28b26672117c3773f18cd54d303f3bed'
    const appId2 = '7a3374a723650c0981c4c46e2f503aa8'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId2}`;
    
    console.log(url)

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {

            limpiarHTML();// Limpia el HTML

            // console.log(datos);
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada')
                return
            }

            // Imprime la respuesta en eel HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    const { name, main: {temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinACentigrado(temp);
    const max = kelvinACentigrado(temp_max);
    const min = kelvinACentigrado(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');


    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv)
}

const kelvinACentigrado = grados => parseInt(grados - 273.15)

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}