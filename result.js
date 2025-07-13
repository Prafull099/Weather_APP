// ✅ result.js
function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const name = getQueryParam("name");
const city = getQueryParam("city");

const loader = document.getElementById("loader");
const weatherBox = document.getElementById("weather-box");
const forecastBox = document.getElementById("forecast-box");

if (!name || !city) {
  weatherBox.innerHTML = "<p>Missing name or city.</p>";
} else {
  loader.style.display = "block";

  fetch(`https://wttr.in/${city}?format=j1`)
    .then((res) => res.json())
    .then((data) => {
      const area = data.nearest_area[0].areaName[0].value;
      const temp = data.current_condition[0].temp_C;
      const desc = data.current_condition[0].weatherDesc[0].value;

      weatherBox.innerHTML = `
        <h2>Hello, ${name} 👋</h2>
        <p><strong>City:</strong> ${area}</p>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${desc}</p>
      `;

      for (let i = 0; i < 3; i++) {
        const date = new Date(data.weather[i].date).toLocaleDateString("en-US", { weekday: "short" });
        const avgTemp = data.weather[i].avgtempC;
        const condition = data.weather[i].hourly[0].weatherDesc[0].value;

        forecastBox.innerHTML += `
          <div class="day-card">
            ${date}<br>${condition}<br>${avgTemp}°C
          </div>
        `;
      }
    })
    .catch((err) => {
      weatherBox.innerHTML = `<p>Error loading weather data</p>`;
      console.error(err);
    })
    .finally(() => {
      loader.style.display = "none";
    });
}
