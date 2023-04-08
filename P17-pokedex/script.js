document.addEventListener("DOMContentLoaded",function() {

    const fetchPokemons = async(endpoint) => {
        let data;
        try {
            const response = await fetch(endpoint,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                }
            })
            data=await response.json();
        } catch(error){
            console.log(error)
        }
        return data.pokemon_species;
    };
    async function getPokemons(numero) {
        let endpoint = `https://pokeapi.co/api/v2/generation/${numero}/`
        var container = document.getElementById('container')
        container.innerHTML="";
        let pokemons = []
        pokemons = await fetchPokemons(endpoint)
    }

    var geners = [
        "generation-1",
        "generation-2",
        "generation-3",
        "generation-4",
        "generation-5",
        "generation-6",
        "generation-7",
    ];
    var filters = document.getElementById('filters');
    var gen = "";
    for (let i = 0; i < geners.length; i++){
        gen+=`<input class="radio-gens" type="radio" id=${geners[i]} value=${i+1} name="generation" checked>
        <label for=${geners[i]} class="label-gens">${geners[i]}</label>`
    };
    filters.innerHTML=gen
});