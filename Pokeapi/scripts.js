const pokemonContainer = document.querySelector('.container-pokedex')
const contenedorCarta = document.querySelector('.Carta')
const boton = document.querySelector('.BottonB')
const back = document.querySelector('.Back')
const formData = document.querySelector('form')
const None = document.querySelector('pokeNone');
const errBack = document.querySelector('.errBack')
let id;



//! obtener los pokemones
async function getPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => response.json())
        .then((data) => {
            createPokemons(data, false);
            if (id < 20) {
                getPokemon(id + 1);
            }
        });
}
//! busqueda pokemon
const searchPokemon = (event, name) => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then(data => data.json())
        .then(response => {
            //! guaradar el id y retornar para que no vuelva a aparecer el pokemon
            if(id === response.id) return;
            id = response.id;
            createPokemons(response, true)
        })
        .catch(error => NotFound(error))
}
//! obeter uno a uno los pokemones 
function getPokemons() {
    getPokemon(1)
}
//! invocar los pokemones 
getPokemons(); 


//!busqueda enter
formData.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("click");
    var inputString = $("#input").val();
    console.log(inputString);
    searchPokemon(event, inputString)
    if(inputString == ""){
        location.reload()
    }
    formulario.reset();
    $("#PokeCont").fadeOut("fast");
    $("#PokeNone").fadeOut("fast");
    $("#carta").fadeIn("slow");
})

//!busqueda boton 
boton.addEventListener('click', (event) => {
    var inputString = $("#input").val();
    searchPokemon(event, inputString)
    if(inputString == ""){
        location.reload()
    }
    formulario.reset();
    $("#PokeCont").fadeOut("fast");
    $("#PokeNone").fadeOut("fast");
    $("#carta").fadeIn("fast");
})
back.onclick = function(){
    location.reload()
};
errBack.onclick = function(){
    $("#carta").fadeIn("fast");
    $("#PokeNone").fadeOut("fast");
}
//! si no los encuentra 
function NotFound (error) {
    $("#PokeNone").fadeIn("slow");
    $("#PokeCont").fadeOut("fast");
    $("#carta").fadeOut("fast");
}
//! pintar los pokemones
function createPokemons(pokemon, busqueda) {
    if (busqueda == false) {
        //! flipcard
        const flipCard = document.createElement("div");
        flipCard.classList.add("flip-card");

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        flipCard.appendChild(cardContainer);

        //!carta principal
        const card = document.createElement("div");
        card.classList.add('pokemon-block');

        //!seccionar las imagenes 
        const spriteContainer = document.createElement("div");
        spriteContainer.classList.add('img-container');
        //!extraer las imagenes
        const sprite = document.createElement("img");
        sprite.src = pokemon.sprites.front_default;
        //! añadir las imagenes extraidas 
        spriteContainer.appendChild(sprite);

        // !id
        const number = document.createElement('p');
        number.textContent = `№: ${pokemon.id.toString()}`;

        // !nombre
        const name = document.createElement("h1");
        name.classList.add("nombre");
        name.textContent = pokemon.name;

        //! añadir todo a la carta 
        card.appendChild(spriteContainer);
        card.appendChild(number);
        card.appendChild(name);
        card.appendChild(renderTypes(pokemon.types));

        //! los stats de los pokemones 
        const cardBack = document.createElement("div");
        cardBack.classList.add('pokemon-block-back');
        cardBack.appendChild(RenderStarts(pokemon.stats));

        //! se debe añadir si no no va a aparecer 
        cardContainer.appendChild(card);
        cardContainer.appendChild(cardBack);
        pokemonContainer.appendChild(flipCard);
    } else {
        //! flipcard
        const flipCard = document.createElement("div");
        flipCard.classList.add("flip-card");

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        flipCard.appendChild(cardContainer);

        //! carta principal
        const card = document.createElement("div");
        card.classList.add('pokemon-block');

        //! seccionar las imagenes 
        const spriteContainer = document.createElement("div");
        spriteContainer.classList.add('img-container');
        //! extraer las imagenes
        const sprite = document.createElement("img");
        sprite.src = pokemon.sprites.front_default;
        //! añadir las imagenes extraidas 
        spriteContainer.appendChild(sprite);

        //! id
        const number = document.createElement('p');
        number.textContent = `№: ${pokemon.id.toString()}`;
        //! nombre
        const name = document.createElement("h1");
        name.classList.add("nombre");
        name.textContent = pokemon.name

        //! añadir todo a la carta 
        card.appendChild(spriteContainer);
        card.appendChild(number);
        card.appendChild(name);
        card.appendChild(renderTypes(pokemon.types));
        

        //! los stats de los pokemones 
        const cardBack = document.createElement("div");
        cardBack.classList.add('pokemon-block-back');
        cardBack.appendChild(RenderStarts(pokemon.stats));

        //! se debe añadir si no no va a aparecer 
        cardContainer.appendChild(card);
        cardContainer.appendChild(cardBack);
        contenedorCarta.replaceChildren();
        contenedorCarta.appendChild(flipCard);
    }

}
//!informacion acerca de los pokemones 
function RenderStarts(stats) {

    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 6; i++) {
        const stat = stats[i];
        const statContainer = document.createElement("stat-container");

        statContainer.classList.add('div-3d')

        const statName = document.createElement('div');
        statName.textContent = stat.stat.name;
        
        const desc = document.createElement("div");
        desc.classList.add("progress");

        const numbers = document.createElement("div");
        numbers.textContent = stat.base_stat;

        desc.appendChild(numbers);
        statContainer.appendChild(statName);
        statContainer.appendChild(numbers);

        statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}

//! cargar los tipos
function renderTypes(types){
    const TypesContainer = document.createElement("div");
    TypesContainer.classList.add("types");
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        const typeContainer = document.createElement("type-container");
        typeContainer.classList.add('div');

        const typeName = document.createElement('div');
        typeName.textContent = type.type.name;

        typeContainer.appendChild(typeName);
        TypesContainer.appendChild(typeContainer);

    }
    return TypesContainer;
}


//! renderizar el nombre y el id 
/*function renderPokemonDatos(data) {
    pokeStats.innerHTML = '';
    const sprite = data.sprites.front_default;
    const {
        stats
    } = data;
    console.log(data)
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `№: ${data.id}`;
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div');
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}*/
// si el usuario trata de buscar un pokemon que no existe 

