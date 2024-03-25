let pokemonList = [
    {name: "Squirtle", height: 1, types: ['water']},
    {name: "Charmander", height: 2, types: ['fire']},
    {name: "Pikachu", height: 1, types: ['electric']}
];

pokemonList.forEach(function(pokemon) {
    console.log("Name: " + pokemon.name);
    console.log("Height: " + pokemon.height);
    console.log("Types: " + pokemon.types.join(", "));
    console.log("");
});
