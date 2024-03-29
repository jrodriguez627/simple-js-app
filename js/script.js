let pokemonRepository = (function () {
    let repository = [
        {
            name: "Squirtle",
            height: 1,
            types: ["water"],
        },
        {
            name: "Charmander",
            height: 2,
            types: ["fire"],
        },
        {
            name: "Pikachu",
            height: 1,
            types: ["electric"],
        },
    ];

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        ) {
            repository.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return repository;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        // add event listener to the button
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    // shows details of the clicked pokemon
    function showDetails(pokemon) {
        console.log("Name: " + pokemon.name);
        console.log("Height: " + pokemon.height);
        console.log("Types: " + pokemon.types.join(", "));
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.add({ name: "Bulbasaur", height: 2, types: ['grass', 'poison'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
