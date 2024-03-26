var pokemonRepository = (function() {
    // place pokemonList in an IIFE to avoid accessing global state
    var pokemonList = [
        {name: "Squirtle", height: 1, types: ['water']},
        {name: "Charmander", height: 2, types: ['fire']},
        {name: "Pikachu", height: 1, types: ['electric']}
    ];
  
    // define getAll function to return pokemonList array
    function getAll() {
        return pokemonList;
    }
  
    // define add function to add new pokemon to pokemonList array
    function add(pokemon) {
        // check if argument is object
        if (typeof pokemon === 'object' && pokemon !== null) {
            pokemonList.push(pokemon);
        } else {
            console.error('error: This is not a Pokemon.');
        }
    }
  
    // return an object with references to getAll and add functions
    return {
        getAll: getAll,
        add: add
    };
  })();
  
  var retrievedPokemonList = pokemonRepository.getAll();
  console.log(pokemonRepository.getAll());
  pokemonRepository.add({name: "Bulbasaur", height: 2, types: ['grass', 'poison']});
  console.log(pokemonRepository.getAll());
  
  // forEach loop to iterate over each Pokémon in the repository
  retrievedPokemonList.forEach(function(pokemon) {
    console.log("Name: " + pokemon.name);
    console.log("Height: " + pokemon.height);
    console.log("Types: " + pokemon.types.join(", "));
    console.log("");
  });