function iniciarAPP(){

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', selectCategoria);

    const resultado = document.querySelector('#resultado');

    obtenerCategorias();

    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url)
            .then( respuesta =>  respuesta.json() )
            .then( resultado => mostrarCategorias(resultado.categories) )
    }

    function mostrarCategorias(categorias = []){
        categorias.forEach( categoria =>{
            const {strCategory} = categoria;
            const option = document.createElement('OPTION');
            option.value = categoria.strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option);

        })
    }

    function selectCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
        fetch(url)
            .then( respuesta => respuesta.json())
            .then( resultado => mostarRecetas(resultado.meals))
    }

    function mostarRecetas(recetas = []){

        limpiarHtml(resultado);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-blank', 'my-5');
        heading.textContent = recetas.length ? 'Resultados': 'No hay resultados';
        resultado.appendChild(heading)

        // Iterar en los resultados
        recetas.forEach(receta => {
            const { idMeal, strMeal, strMealThumb } = receta

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal}`;
            recetaImagen.src = strMealThumb;

            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver receta';


            // Inyectar en el codigo HTML

            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);
        })

    }

    function limpiarHtml(selector){
        while(selector.firstChild){
            selector.removeChild(selector.firstChild);
        }
    }
};

document.addEventListener('DOMContentLoaded', iniciarAPP);