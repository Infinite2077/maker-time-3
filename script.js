
const URL =
    'http://api.weatherapi.com/v1/forecast.json?key=c228da7152d04f7f8ea111412250106&q=Kyiv&days=14&aqi=no&alerts=no'
fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector(".main").innerHTML += `<p class="city">${data.location.name}</p>`
        data.forecast.forecastday.forEach((el) => {
            document.querySelector(".main").innerHTML += `    
                <div class="Pogoda">
                    <p class="temprature">${el.day.avgtemp_c} температура</p>
                    <p class="wind">${el.day}</p>
                    <p class="cloudy"></p>
                </div>
            `;
        });
    })
