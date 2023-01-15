const pokemonName = document.querySelector('.pokemon_name')  
const pokemonNumber = document.querySelector('.pokemon_number')  
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')  
const Input = document.querySelector('.input_search')

const prevBtn = document.querySelector('.btn-prev')  
const nextBtn = document.querySelector('.btn-next')  

let searchPokemon = 1; 

const fetchpokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data; 
    }
  
}

const renderpokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchpokemon(pokemon);
    if(data){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']
['black-white']['animated']['front_default'];
    Input.value = '';
    searchPokemon = data.id
   }else{
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = "not found";
    pokemonNumber.innerHTML = '';
    
   }
}


form.addEventListener('submit',(event) =>{
    event.preventDefault();

    renderpokemon(Input.value.toLowerCase());
    Input.value = '';
} )

prevBtn.addEventListener('click',() =>{
    if(searchPokemon > 1){
    searchPokemon -=1;
   renderpokemon(searchPokemon);
}
}
 )

nextBtn.addEventListener('click',() =>{
   searchPokemon +=1;
   renderpokemon(searchPokemon);
} )
renderpokemon('1')