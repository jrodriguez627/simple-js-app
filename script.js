let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let pokemonList = $('.pokemon-list');
      let listItem = $('<li></li>').addClass('list-group-item');
      let button = $('<button></button>').text(pokemon.name).addClass('btn btn-primary btn-block');
      listItem.append(button);
      pokemonList.append(listItem);
  
      // Bootstrap modal functionality
      button.attr('data-toggle', 'modal');
      button.attr('data-target', '#modal');
  
      button.on("click", function(event) {
        showDetails(pokemon);
      });
    }
  
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
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        let modalTitle = $('#modal-title');
        let modalHeight = $('#modal-height');
        let modalImage = $('#modal-image');
  
        modalTitle.text(item.name);
        modalHeight.text('Height: ' + item.height);
        modalImage.attr('src', item.imageUrl);
      });
    }
  
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
  