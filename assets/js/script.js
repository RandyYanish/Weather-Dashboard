// Declarations
const searchButton = document.getElementById('search-button');
const searchList = document.getElementById('search-list');
const citySearchUserInput = document.getElementById('city-search');
const APIKey = 'ac3cf12de3a2b963a1bb1bad3582936f';

// Load search history map from localStorage
const searchHistoryMap = new Map(JSON.parse(localStorage.getItem('searchHistoryMap')) || []);

const loadWeatherAPI = function() {
    const queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearchUserInput.value + '&appid=' + APIKey;

    // Fetch API data
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            // Save data to search history map
            localStorage.setItem('weatherDisplay', JSON.stringify(data));
            searchHistoryMap.set(citySearchUserInput.value, JSON.stringify(data));
            localStorage.setItem('searchHistoryMap', JSON.stringify([...searchHistoryMap.entries()]));
            console.log(data);
        })
        .catch(error => console.error(error));
    
    // Add button in search history
    let newSearchButton = document.createElement('button');
    newSearchButton.className = 'btn btn-secondary w-100 mb-3 p-2';
    newSearchButton.id = citySearchUserInput.value;
    newSearchButton.textContent = citySearchUserInput.value;

    // Append new button to Search History
    searchList.appendChild(newSearchButton);
};

// // Retrieve localStorage search history
// const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// // On button click, save input id city-search
// searchButton.addEventListener('click', function()   {
    //     // Save search to LocalStorage
    //     const userInput = citySearchUserInput.value;
    //     localStorage.setItem('city', userInput);
    // });
    
    // On button click, id city-name will display city name
    
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
    searchButton.addEventListener('click', loadWeatherAPI);