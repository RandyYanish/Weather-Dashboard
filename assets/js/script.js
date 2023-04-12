// Declarations
const searchButton = document.getElementById('search-button');
const searchList = document.getElementById('search-list');
const citySearchUserInput = document.getElementById('city-search');
const currentWeatherImage = document.getElementById('current-weather-icon');
const APIKey = 'ac3cf12de3a2b963a1bb1bad3582936f';

// Load search history map from localStorage
const searchHistoryMap = new Map(JSON.parse(localStorage.getItem('searchHistoryMap')) || []);

// Function to add search history button
const searchHistoryButton = function(city) {
    // Add button in search history
    let newSearchButton = document.createElement('button');
    newSearchButton.className = 'btn btn-secondary w-100 mb-3 p-2 search';
    newSearchButton.id = city;
    newSearchButton.textContent = city;
    
    // Append new button to Search History
    searchList.appendChild(newSearchButton);
};

// For loop to generate search history buttons
for (let [city, data] of searchHistoryMap.entries())    {
    searchHistoryButton(city);
};

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

            // Create button
            searchHistoryButton(citySearchUserInput.value);

            // Delete oldest search history if more than 10
            if (searchHistoryMap.size > 10) {
                const oldestCity = searchHistoryMap.keys().next().value;
                searchHistoryMap.delete(oldestCity);
                localStorage.setItem('searchHistoryMap', JSON.stringify([...searchHistoryMap.entries()]));
                const oldestButton = document.getElementById(oldestCity);
                if (oldestButton) {
                    oldestButton.remove();
                };
            };
            
            console.log(data);
        })
        .catch(error => console.error(error));
    
};

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