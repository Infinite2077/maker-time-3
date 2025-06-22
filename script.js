const select = document.querySelector("#select")
const form = document.querySelector(".SearchForm")
const input = document.querySelector(".input")
const body = document.querySelector("body")

function getWeather(city) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=c228da7152d04f7f8ea111412250106&q=${city}&days=14&aqi=no&alerts=no`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector(".city").innerHTML = data.location.name
            document.querySelector(".main").innerHTML = ''
            
            // Очищаємо контейнер поточної погоди
            const currentContainer = document.querySelector(".current-weather-container")
            currentContainer.innerHTML = ''
            
            // Зміна фону в залежності від погоди
            if (data.current.condition.code === 1000) {
                body.style.background = 'linear-gradient(135deg,rgb(255, 145, 0),rgb(255, 242, 0))'
            }
            // ... інші умови для фону ...

            // Створюємо блок поточної погоди
            currentContainer.innerHTML = `
                <div class="current-weather">
                    <div class="current-header">
                        <img src="${data.current.condition.icon}" alt="Поточна погода">
                        <div class="current-temp">${data.current.temp_c}°C</div>
                    </div>
                    <div class="current-condition">${data.current.condition.text}</div>
                    <div class="current-details">
                        <p><i class="fa-solid fa-temperature-high"></i> Відчувається як: ${data.current.feelslike_c}°C</p>
                        <p><i class="fa-solid fa-wind"></i> Вітер: ${data.current.wind_kph} км/год</p>
                        <p><i class="fa-solid fa-droplet"></i> Вологість: ${data.current.humidity}%</p>
                        <p><i class="fa-solid fa-gauge-high"></i> Тиск: ${data.current.pressure_mb} гПа</p>
                    </div>
                </div>
            `;

            // Додаємо прогноз на 14 днів
            data.forecast.forecastday.forEach((el) => {
                document.querySelector(".main").innerHTML += `    
                    <div class="Pogoda">
                        <p class="day">${el.date}</p>
                        <img class="weather-icon" src="${el.day.condition.icon}" alt="Погода" />
                        <p class="temprature"><i class="fa-solid fa-temperature-three-quarters"></i> ${el.day.avgtemp_c}°C</p>
                        <p class="wind"><i class="fa-solid fa-wind"></i> Вітер: <strong>${el.day.maxwind_kph} км/год</strong></p>
                        <p class="rain"><i class="fa-solid fa-cloud-rain"></i> Дощ: <strong>${el.day.daily_chance_of_rain}%</strong></p>
                        <p class="sunrise">🌅 Світанок: <strong>${el.astro.sunrise}</strong></p>
                        <p class="sunset">🌇 Захід: <strong>${el.astro.sunset}</strong></p>
                    </div>
                `;
            });
        }).catch((err) => alert('За вашим запитом нічого не знайдено'))
}

// ... решта коду без змін ...

select.addEventListener("change", () => {
    getWeather(select.value)
})

getWeather(select.value)

form.addEventListener("submit", (e) => {
    e.preventDefault()
    getWeather(input.value)
})
