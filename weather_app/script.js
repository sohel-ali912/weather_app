const apiKey = 'c77d01505d459068433eccabfd084457'; // Replace with your OpenWeather API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const errorElement = document.getElementById('error');

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch(
     ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(response.status === 404 ? 'City not found' : 'Something went wrong');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
});

function displayWeather(data) {
  errorElement.classList.add('hidden');
  weatherInfo.classList.remove('hidden');
  document.getElementById('cityName').textContent = `Weather in ${data.name}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').textContent =  `Wind Speed: ${data.wind.speed} m/s`;
}

function showError(message) {
  weatherInfo.classList.add('hidden');
  errorElement.classList.remove('hidden');
  errorElement.textContent = message;
}
