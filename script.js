
const URL =
    'http://api.weatherapi.com/v1/forecast.json?key=c228da7152d04f7f8ea111412250106&q=Kyiv&days=14&aqi=no&alerts=no'
fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log( data.forecast.forecastday)
        document.querySelector(".city").innerHTML = data.location.name
        data.forecast.forecastday.forEach((el) => {
            document.querySelector(".main").innerHTML += `    
                <div class="Pogoda">
                    <img class="weather-icon" src="${el.day.condition.icon}" />
                    <p class="temprature">${el.day.avgtemp_c} ° температура</p>
                    <p class="wind">ШВидкість вітру: ${el.day.maxwind_kph} км/год </p>
                    <p class="cloudy"> </p>
                </div>
            `;
        });
    })
