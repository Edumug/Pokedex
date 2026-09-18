const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const next = document.querySelector('.btn-next')
const prev = document.querySelector('.btn-prev')

let searchPokemon = 1;

const fetchPokemon =  async(pokemon) => {
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading... '
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    } else{
        pokemonName.innerHTML = 'Who is he?';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = 'images/tung.webp'
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});
prev.addEventListener('click', () => {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);

//abner