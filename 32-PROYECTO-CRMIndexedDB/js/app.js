(function () {

    let DB;

    document.addEventListener('DOMContentLoaded', () =>{
        crearDB();
    });

    // Crea la base de datos de indexedDB
    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function() {
            console.log('hubo un error');
        };

        crearDB.onsuccess = function() {
            DB = crearDB.result;
        };

        crearDB.onupgradeneeded = function(e){
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keypath: 'id', autoIncrement: true });

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: false });

            console.log('DB lista creada')
        }
    }
})()