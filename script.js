/** @format */
const key = "bf2667240761de56afefbcb862fbbeb9";

const form = document.querySelector("form");
let details = document.querySelector(".details");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	details.innerHTML = "<h1>Loading...</h1>";
	const location = e.target.location.value;

	WeatherApp(location);
	form.reset();
});
async function WeatherApp(location) {
	let data = await fetchApi(location);

	generateHTML(data);
}
async function fetchApi(location) {
	let res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
	);
	let data = await res.json();
	return data;
}
function generateHTML(data) {
	const html = `<h1 class="temp">Temp: ${(data.main.temp - 273.15).toFixed(2)}°C</h1>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="" class="icon" />
    <h1 class="status">${data.weather[0].description}</h1>
    <div class="more-info">
        <p>Humidty:${data.main.humidity}%</p>
        <p>Wind speed:${data.wind.speed} km/h </p>
        <p>pressure:${data.main.pressure} hpa</p>
        
    </div> 
    <div class="name"><h2>${data.name}</h2><div>`;
	details.innerHTML = html;
}
