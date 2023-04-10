// Declarations
const searchButton = document.getElementById('search-button');
const citySearchInput = document.getElementById('city-search');
const APIKey = "ac3cf12de3a2b963a1bb1bad3582936f";
const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +citySearchInput + "&appid=" +APIKey;

var citySearch() {
    fetch(queryURL);
} 

// TODO: save inputs in #city-search to localStorage
// TODO: Generate button in #search-list => <button class="btn btn-secondary w-100 mb-3 p-2">Atlanta</button> from local storage (maximum 10 previous searches)

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// Event Listeners
searchButton.addEventListener('click', loadWeatherDashboard)