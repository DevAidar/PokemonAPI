// HTTP lab
// Documentation: https://pokeapi.co/docsv2/
// Endpoint: http://pokeapi.co/api/v2/pokemon/ - (Gets list of first 20 Pokemon)

// Objective
// Explore the PokeAPI documentation
// Using the API endpoint, make a GET request with ajax
// Print the response object to the console
// Render the first 20 pokemon to page using jQuery

// Stretch  Goals

// 1)
// Make a 'next' button which will handle making another GET request for the next 20 pokemon.
// Render the new response object to the page.

// This functionality should be able to cycle through and display all the pokemon, 20 at a time.
// let body = document.body;
//
// let nextButton = document.createElement('BUTTON');
// nextButton.id = 'next-button';
// nextButton.innerHTML = 'next';
//
// body.appendChild(nextButton);


// 2)
// Make each individual pokemon clickable, such that when a user clicks them,
// that specific pokemons information is rendered to the page
// Note: Each pokemon has two properties, name and url. The URL property is where you can request
// information specific to that pokemon.
// There is a lot of information for each pokemon, so feel free to pick and choose which properties to include on the page

// 3)
// Included a section for berries, items, moves, or any other miscellaneous data you wish to include

// 4)
// Style your page :)

let pokemonsOnPage = 0;


// Waits for html document to load
$('document').ready(function() {
    console.log('file loaded..');

    // Create header for app
    let mainHeader = '<div id="main_header" style="background-color: orange; height: 50px; color: white;"></div>';
    $('#app').append(mainHeader);
    let headerContainer = '<div id="header_container" class="container"></div>';
    $('#main_header').append(headerContainer);
    let pokemonLogo = '<span><img src="https://pluspng.com/img-png/pokemon-logo-png-pokemon-logo-png-2000.png" alt="Pokemon" id="logo" class="pokemon-logo"></span>';
    $('#header_container').append(pokemonLogo);

    let mainBody = '<div id="main_body"></div>';
    $('#app').append(mainBody);
    // Create a pokemon container
    let bodyContainer = '<div id="body_container" class="container pokemons"></div>';
    $('#main_body').append(bodyContainer);

    // Create a get more pokemon button
    let moreButton = '<input id="more_button" class="more_button" type="button" value="More Pokemons"></input>';
    $('#main_body').append(moreButton);
    $(`#more_button`).click((event) => getMorePokemon(event));

    getInitialPokemon();
});

function getInitialPokemon() {

    var _pokemon;
    var _queryUrl = `https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/pokemon/`;

    // Get request for pokemon data using ajax
    $.ajax({
        url: _queryUrl,
        method: "GET",
    })

    // .done waits for the response object from our ajax request
    .done(function(response) {
        _pokemon = response.results;
        appendItemsToPage(_pokemon.slice(0, 1));
    });
}

function getMorePokemon() {

    // Increase pokemon 'limit' - or how many I get back - by using the limit QUERY STRING
    var _queryUrl = `https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/pokemon/?limit=${pokemonsOnPage + 21}`;

    $.ajax({
        url: _queryUrl,
        method: "GET",
    })

    // .done waits for the response object from our ajax request
    .done(function(response) {
        _pokemon = response.results;
        appendItemsToPage(_pokemon.slice(pokemonsOnPage, pokemonsOnPage + 20));
    });
}

// This is the event function to handle getting more info on a clicked pokemon
function getOnePokemon(event) {
    console.log(event);
    var _queryUrl = `https://cors-anywhere.herokuapp.com/http://pokeapi.co/api/v2/pokemon/?limit=${pokemonsOnPage}`;

    // var url = event.data.url;
// console.log("Hello brother");

    $.ajax({
        url: _queryUrl,
        method: "GET",
    })

    // .done waits for the response object from our ajax request
    .done(function(response) {
        _pokemon = response.results;
        console.log(event.target.id.substr(16));
        window.location = `https://www.pokemon.com/us/pokedex/${_pokemon[event.target.id.substr(16)].name}/`
    });
}

function appendItemsToPage(_pokemon) {
    for (let i = 0; i < _pokemon.length; i++) {
        // Pokemon card
        let pokemonCard = `<div id="pokemon_card_${pokemonsOnPage}" class="pokemon_card"></div>`;
        $('#body_container').append(pokemonCard);
        let pokemonPicture = `<img id="pokemon_picture_${pokemonsOnPage}" class="pokemon_picture" src="https://pokeres.bastionbot.org/images/pokemon/${pokemonsOnPage + 1}.png" alt="${_pokemon.name}">`;
        $(`#pokemon_card_${pokemonsOnPage}`).append(pokemonPicture);

        // Pokemon name div
        let pokemonNameContainer = `<div id="pokemon_name_container_${pokemonsOnPage}" class="pokemon_name_container"></div>`;
        $(`#pokemon_card_${pokemonsOnPage}`).append(pokemonNameContainer);

        // Pokemon name
        let pokemonName = `<a id="pokemon_name_${pokemonsOnPage}" class="pokemon_name" href="https://www.pokemon.com/us/pokedex/${_pokemon[i].name}/">${_pokemon[i].name[0].toUpperCase() + _pokemon[i].name.substr(1)}</a>`;

        // Putting together the pokemon card and appending to page
        $(`#pokemon_name_container_${pokemonsOnPage}`).append(pokemonName);

        // Add click event listener to each pokemon name
        $(`#pokemon_picture_${pokemonsOnPage}`).click((event) => getOnePokemon(event));
        pokemonsOnPage++;
    }
}
