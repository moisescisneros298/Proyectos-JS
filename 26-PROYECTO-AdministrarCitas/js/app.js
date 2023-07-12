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

// Editando
let editando;

// Clases
class citas {
    constructor() {
        this.citas = []
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id )
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
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
            divMensaje.classList.add('alert-success');
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

            // Boton para eliminar la cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">' +
            '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />' +
            '</svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            // Boton para editar cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">' +
            '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />'+
            '</svg>';
            btnEditar.onclick = () => cargarEdicion(cita);

            // Agrehat los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

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

    if(editando) {
        ui.imprimirAlerta('Editado correctamente');

        // Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        // Regresar el texto del boton a su estado iriginal
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        // Quitar modo edicion
        editando = false;

    } else {
        // Generar un id unico
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente')
    }


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


function eliminarCita(id) {
    // Eliminar cita
    administrarCitas.eliminarCita(id);
    // Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente',);
    // Refrescar la cita
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edicion
function cargarEdicion(cita) {
    console.log(cita);
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    
    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sinstomassInput.value = sintomas;

    // Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}
