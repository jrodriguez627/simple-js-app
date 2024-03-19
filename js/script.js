let pokemonList = [
    {name: "Squirtle", height: 1, types: ['water']},
    {name: "Charmander", height: "2", types: ['fire']},
    {name: "Pikachu", height: 1, types: ['electric']}
];

// looping through each pokemon from array
for (let i = 0; i < pokemonList.length; i++) {
   
    let pokemon = pokemonList[i];

    // Check if the height of the pokemon is greater than 1
    if (pokemon.height > 1) {
        // If the height is greater than 1, include text 'wow, that's big!'
        document.write(pokemon.name + " - height: " + pokemon.height + " wow, that's big!" + "<br>");
    } else {
        // If the height is not greater than 1, only include the name and height
        document.write(pokemon.name + " - height: " + pokemon.height + "<br>");
    }
}