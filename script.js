const select=document.querySelector("#select")

function getWeather(city) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=c228da7152d04f7f8ea111412250106&q=${city}&days=14&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(data => {
            console.log(data.forecast.forecastday)
            document.querySelector(".city").innerHTML = data.location.name
            document.querySelector(".main").innerHTML = ''
            data.forecast.forecastday.forEach((el) => {
                document.querySelector(".main").innerHTML += `    
                <div class="Pogoda">
                    <p class="day"> ${el.date}</p>
                    <img class="weather-icon" src="${el.day.condition.icon}" />
                    <p class="temprature">${el.day.avgtemp_c} ° температура</p>
                    <p class="wind">Швидкість вітру: ${el.day.maxwind_kph} км/год </p>
                    <p class="cloudy">${el.day}</p>
                </div>
            `;
            });
        }).catch((err)=>alert('zhytomer!!!'))
}

select.addEventListener("change", ()=>{   
getWeather(select.value)
})

getWeather(select.value)