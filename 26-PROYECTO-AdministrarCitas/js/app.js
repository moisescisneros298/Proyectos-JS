// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sinstomassInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// Clases
class citas {
    constructor() {
        this.citas = []
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas)
    }
}

class UI {

    imprimirAlerta(mensaje, tipo){
        // Crear el div 
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alenert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta despues de 5s
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();

        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-wight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('P');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            ` 

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder"> Telefono: </span> ${telefono}
            `
            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Fecha: </span> ${fecha}
            `

            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Hora: </span> ${hora}
            `

            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder"> Sintomas: </span> ${sintomas}
            `
            
            // Agrehat los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            // Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        } )
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const ui = new UI();
const administrarCitas = new citas();


// Registrar eventos
eventlisteners();
function eventlisteners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sinstomassInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// Objeto con informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agregar datos al objeto
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

    // console.log(citaObj);
}

// Valida y agrega una nueva cita a la clase de citas

function nuevaCita(e) {
    e.preventDefault();

    // Extraer la informacion del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar 
    if(mascota === '' || propietario === '' || telefono === '' || fecha === ''|| hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligarios', 'error');

        return;
    }

    // Generar un id unico
    citaObj.id = Date.now();

    // Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});

    // Reiniciar el objeto para su validacion
    reiniciarObjeto();

    // Resetea el formulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}