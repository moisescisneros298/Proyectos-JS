import citas from './citas.js';
import UI from './ui.js';
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sinstomassInput, formulario } from './selectores.js';

const ui = new UI();
const administrarCitas = new citas();
let editando;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

    // console.log(citaObj);
}

export function nuevaCita(e) {
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

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}


export function eliminarCita(id) {
    // Eliminar cita
    administrarCitas.eliminarCita(id);
    // Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente',);
    // Refrescar la cita
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edicion
export function cargarEdicion(cita) {
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
