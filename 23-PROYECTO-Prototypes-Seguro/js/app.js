//Constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Realiza ;a cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){


    let cantidad;
    const base = 2000;

    console.log(this.marca);
    switch(this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.05;
            break;
        default:
            break;
    }

    // Leer el year 
    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3 ) * cantidad ) / 100;

    /*
        Si el seguro ess basico se multiplica por un 30% mas
        Si el seguro ess completo se multiplica por un 50% mas
    */

    if (this.tipo === 'basico') {
        cantidad += 1.30;
    } else {
        cantidad += 1.50;
    }

    return cantidad

    console.log(cantidad)
}

function UI() {}

//llena las opciones de los years
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 23;

    const selectYear = document.querySelector('#year')

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo ) => {

    const div = document.createElement('div');
    
    if(tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje

    // Incertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove()
    }, 3000)
}

UI.prototype.mostrarResultado = (total, seguro) => {

    const {marca, year, tipo} = seguro;
    let textoMarca;

    switch(marca) {
        case '1':
            textoMarca = 'Americano';
        case '2':
            textoMarca = 'Asiatico';
        case '3':
            textoMarca = 'Europeo';
    

        default:
            break;
    }

    //crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header"> Tu resumen </p>
        <p class="font-bold">Marca: <spam class="font-normal">  ${textoMarca} </span></p>
        <p class="font-bold">Year: <spam class="font-normal">  ${year} </span></p>
        <p class="font-bold">Tipo: <spam class="font-normal capitalize">  ${tipo} </span></p>
        <p class="font-bold">Total: <spam class="font-normal"> $ ${total} </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    //Mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; //Se borra el spinner y se muestra el resultado
        resultadoDiv.appendChild(div);
    }, 3000);
}

//Instanciar UI
const ui = new UI();
console.log(ui);


document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); // Llena el select con los years
})

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    //Leer el year seleccionado
    const year = document.querySelector('#year').value;

    //Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');

    //Ocultar las cotozacione previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }

    //Instanciar el seguro
    const seguro = new Seguro(marca,year, tipo);
    const total = seguro.cotizarSeguro();


    // Utilizar el prototype ue va a cotizar
    ui.mostrarResultado(total, seguro);
}
