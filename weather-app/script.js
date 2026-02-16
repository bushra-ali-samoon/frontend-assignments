const apiKey = "2303e403841f6f75709b3e1ef70bfab2";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {

      if (data.cod !== 200) {
        document.getElementById("weatherResult").innerHTML =
          `❌ ${data.message}`;
        return;
      }

      displayWeather(data);
    })
    .catch(err => {
      document.getElementById("weatherResult").innerHTML =
        "⚠️ Network error";
      console.error(err);
    });
}

function displayWeather(data) {
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const condition = data.weather[0].main;

  document.getElementById("weatherResult").innerHTML = `
    <h3>${condition}</h3>
    <p>🌡️ ${temp}°C</p>
    <p>💧 ${humidity}%</p>
  `;

  changeBackground(condition);
}


function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => displayWeather(data));
  });

}
function changeBackground(condition) {

  let bgUrl = "";

  if (condition === "Clear") {
    bgUrl = "https://images.unsplash.com/photo-1502082553048-f009c37129b9";
  } 
  else if (condition === "Rain") {
    bgUrl = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D";
  } 
  else if (condition === "Clouds") {
    bgUrl = "https://images.unsplash.com/photo-1603437873662-dc1f44901825?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWRzfGVufDB8fDB8fHww";
  } 
  else {
    bgUrl = "https://images.unsplash.com/photo-1499346030926-9a72daac6c63";
  }

  document.body.style.backgroundImage = `url('${bgUrl}')`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}
