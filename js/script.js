let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // function to add Pokemon to the list
    function add(pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }

    // function to get all Pokemon
    function getAll() {
      return pokemonList;
    }

    // function to add list item for each Pokemon
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listpokemon = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener("click", function(event) {
          showDetails(pokemon);
      });
    }

    // function to load list of Pokemon from API
    function loadList() {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }

    // function to load details of Pokemon
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          // add details to Pokemon item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        .catch(function (e) {
          console.error(e);
        });
    }

    // function shows details of Pokemon in modal
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        // select modal and its elements
        let modal = document.getElementById('modal');
        let modalTitle = document.getElementById('modal-title');
        let modalHeight = document.getElementById('modal-height');
        let modalImage = document.getElementById('modal-image');

        // set modal content
        modalTitle.textContent = item.name;
        modalHeight.textContent = 'Height: ' + item.height;
        modalImage.src = item.imageUrl;

        // display modal
        modal.style.display = 'block';

        // close modal when clicking outside of it
        window.onclick = function (event) {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        };

        // close modal when pressing the Escape key
        document.onkeydown = function (event) {
          if (event.key === 'Escape') {
            modal.style.display = 'none';
          }
        };
      });
    }

    // return public functions
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

// load Pokemon list from API and add list items
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
