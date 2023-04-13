// Declarations
const now = new Date();
const unixTimestampNow = Math.floor(now.getTime() / 1000);
const tempTomorrow = document.getElementById('temp-tomorrow');
const windTomorrow = document.getElementById('wind-tomorrow');
const humidityTomorrow = document.getElementById('humidity-tomorrow');
const weatherIconTomorrow = document.getElementById('weather-icon-tomorrow');
const dateTomorrow = document.getElementById('date-tomorrow');
const tempIn2Days = document.getElementById('temp-in-2-days');
const windIn2Days = document.getElementById('wind-in-2-days');
const humidityIn2Days = document.getElementById('humidity-in-2-days');
const weatherIconIn2Days = document.getElementById('weather-icon-in-2-days');
const dateIn2Days = document.getElementById('date-in-2-days');
const tempIn3Days = document.getElementById('temp-in-3-days');
const windIn3Days = document.getElementById('wind-in-3-days');
const humidityIn3Days = document.getElementById('humidity-in-3-days');
const weatherIconIn3Days = document.getElementById('weather-icon-in-3-days');
const dateIn3Days = document.getElementById('date-in-3-days');
const tempIn4Days = document.getElementById('temp-in-4-days');
const windIn4Days = document.getElementById('wind-in-4-days');
const humidityIn4Days = document.getElementById('humidity-in-4-days');
const weatherIconIn4Days = document.getElementById('weather-icon-in-4-days');
const dateIn4Days = document.getElementById('date-in-4-days');
const tempIn5Days = document.getElementById('temp-in-5-days');
const windIn5Days = document.getElementById('wind-in-5-days');
const humidityIn5Days = document.getElementById('humidity-in-5-days');
const weatherIconIn5Days = document.getElementById('weather-icon-in-5-days');
const dateIn5Days = document.getElementById('date-in-5-days');
const cityName = document.getElementById('city-name');
const weatherIconNow = document.getElementById('current-weather-icon');
const tempNow = document.getElementById('temp-now');
const windNow = document.getElementById('wind-now')
const humidityNow = document.getElementById('humidity-now');
const searchButton = document.getElementById('search-button');
const clearHistoryButton = document.getElementById('clear-history-button');
const searchList = document.getElementById('search-list');
const citySearchUserInput = document.getElementById('city-search');
const currentWeatherImage = document.getElementById('current-weather-icon');
const APIKey = 'ac3cf12de3a2b963a1bb1bad3582936f';

// Load search history map from localStorage
const searchHistoryMap = new Map(JSON.parse(localStorage.getItem('searchHistoryMap')) || []);

// Function to add search history button
const searchHistoryButton = function (city) {
    // Add button in search history
    let newSearchButton = document.createElement('button');
    newSearchButton.className = 'btn btn-secondary w-100 mb-3 p-2 search';
    newSearchButton.id = city;
    newSearchButton.textContent = city;

    // Append new button to Search History
    searchList.appendChild(newSearchButton);

    // Add event listener to button
    newSearchButton.addEventListener('click', function () {
        // Move button to top of list
        searchList.prepend(newSearchButton);

        // Update weatherDisplay localStorage with weather data for clicked city
        const weatherData = JSON.parse(searchHistoryMap.get(city));
        localStorage.setItem('weatherDisplay', JSON.stringify(weatherData));
    });

};


// For loop to generate search history buttons
for (let [city] of searchHistoryMap.entries()) {
    searchHistoryButton(city);
};

const loadWeatherAPI = function () {
    const queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearchUserInput.value + '&appid=' + APIKey + '&units=imperial';

    // Fetch API data
    fetch(queryURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
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

            // Display weather data
        cityName.textContent = `${data.city.name}, ${new Date(data.list[0].dt * 1000).toLocaleDateString()}`;
        tempNow.textContent = data.list[0].main.temp.toFixed(0) + '\u00B0 F';
        windNow.textContent = data.list[0].wind.speed + ' mph';
        humidityNow.textContent = data.list[0].main.humidity + '%';
        weatherIconNow.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
        dateTomorrow.textContent = `${new Date((data.list[0].dt + 86400 ) * 1000).toLocaleDateString()}`;
        tempTomorrow.textContent = data.list[1].main.temp.toFixed(0) + '\u00B0 F';
        windTomorrow.textContent = data.list[1].wind.speed + ' mph';
        humidityTomorrow.textContent = data.list[1].main.humidity + '%';
        weatherIconTomorrow.src = `https://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`;
        dateIn2Days.textContent = `${new Date((data.list[0].dt + 172800 ) * 1000).toLocaleDateString()}`;
        tempIn2Days.textContent = data.list[2].main.temp.toFixed(0) + '\u00B0 F';
        windIn2Days.textContent = data.list[2].wind.speed + ' mph';
        humidityIn2Days.textContent = data.list[2].main.humidity + '%';
        weatherIconIn2Days.src = `https://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`;
        dateIn3Days.textContent = `${new Date((data.list[0].dt + 259200 ) * 1000).toLocaleDateString()}`;
        tempIn3Days.textContent = data.list[3].main.temp.toFixed(0) + '\u00B0 F';
        windIn3Days.textContent = data.list[3].wind.speed + ' mph';
        humidityIn3Days.textContent = data.list[3].main.humidity + '%';
        weatherIconIn3Days.src = `https://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png`;
        dateIn4Days.textContent = `${new Date((data.list[0].dt + 345600 ) * 1000).toLocaleDateString()}`;
        tempIn4Days.textContent = data.list[4].main.temp.toFixed(0) + '\u00B0 F';
        windIn4Days.textContent = data.list[4].wind.speed + ' mph';
        humidityIn4Days.textContent = data.list[4].main.humidity + '%';
        weatherIconIn4Days.src = `https://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`;
        dateIn5Days.textContent = `${new Date((data.list[0].dt + 432000 ) * 1000).toLocaleDateString()}`;
        tempIn5Days.textContent = data.list[5].main.temp.toFixed(0) + '\u00B0 F';
        windIn5Days.textContent = data.list[5].wind.speed + ' mph';
        humidityIn5Days.textContent = data.list[5].main.humidity + '%';
        weatherIconIn5Days.src = `https://openweathermap.org/img/w/${data.list[5].weather[0].icon}.png`;
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
};

// Event Listeners
searchButton.addEventListener('click', loadWeatherAPI);
clearHistoryButton.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});


// Add event listener to each search history button
searchList.addEventListener('click', (event) => {
    if (event.target.classList.contains('search')) {
        const city = event.target.id;
        const data = JSON.parse(searchHistoryMap.get(city));
        localStorage.setItem('weatherDisplay', JSON.stringify(data));
        // Update weather data
        cityName.textContent = `${data.city.name}, ${new Date(data.list[0].dt * 1000).toLocaleDateString()}`;
            tempNow.textContent = data.list[0].main.temp.toFixed(0) + '\u00B0 F';
            windNow.textContent = data.list[0].wind.speed + ' mph';
            humidityNow.textContent = data.list[0].main.humidity + '%';
            weatherIconNow.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
            dateTomorrow.textContent = `${new Date((data.list[0].dt + 86400 ) * 1000).toLocaleDateString()}`;
            tempTomorrow.textContent = data.list[1].main.temp.toFixed(0) + '\u00B0 F';
            windTomorrow.textContent = data.list[1].wind.speed + ' mph';
            humidityTomorrow.textContent = data.list[1].main.humidity + '%';
            weatherIconTomorrow.src = `https://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`;
            dateIn2Days.textContent = `${new Date((data.list[0].dt + 172800 ) * 1000).toLocaleDateString()}`;
            tempIn2Days.textContent = data.list[2].main.temp.toFixed(0) + '\u00B0 F';
            windIn2Days.textContent = data.list[2].wind.speed + ' mph';
            humidityIn2Days.textContent = data.list[2].main.humidity + '%';
            weatherIconIn2Days.src = `https://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`;
            dateIn3Days.textContent = `${new Date((data.list[0].dt + 259200 ) * 1000).toLocaleDateString()}`;
            tempIn3Days.textContent = data.list[3].main.temp.toFixed(0) + '\u00B0 F';
            windIn3Days.textContent = data.list[3].wind.speed + ' mph';
            humidityIn3Days.textContent = data.list[3].main.humidity + '%';
            weatherIconIn3Days.src = `https://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png`;
            dateIn4Days.textContent = `${new Date((data.list[0].dt + 345600 ) * 1000).toLocaleDateString()}`;
            tempIn4Days.textContent = data.list[4].main.temp.toFixed(0) + '\u00B0 F';
            windIn4Days.textContent = data.list[4].wind.speed + ' mph';
            humidityIn4Days.textContent = data.list[4].main.humidity + '%';
            weatherIconIn4Days.src = `https://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`;
            dateIn5Days.textContent = `${new Date((data.list[0].dt + 432000 ) * 1000).toLocaleDateString()}`;
            tempIn5Days.textContent = data.list[5].main.temp.toFixed(0) + '\u00B0 F';
            windIn5Days.textContent = data.list[5].wind.speed + ' mph';
            humidityIn5Days.textContent = data.list[5].main.humidity + '%';
            weatherIconIn5Days.src = `https://openweathermap.org/img/w/${data.list[5].weather[0].icon}.png`;
        // Move button to top of search history
        searchList.insertBefore(event.target, searchList.firstChild);
    }
});