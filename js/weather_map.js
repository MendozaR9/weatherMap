

//Getting Weather Data
function getWeatherData(lon, lat,) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${OWM_key}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let html = "";
            html += '<div class="row justify-content-evenly">'
            // console.log(data.daily[0].dt)
            for (let i = 0; i < 5; i++) {
                let dailyTemp = data.daily[i].temp.day
                var myDate = new Date(data.daily[i].dt * 1000).toLocaleString();
                html += `<div class=" col-md-2 card pb-3 mb-2" style="border:1px #a2d9ef solid; text-align: center"> 
<section class="text-center my-2">${myDate}
<!--                <img src="http://openweathermap.org/img/w/${data.daily[i].weather[0].main}.png">-->
                </section> 
                Temp: ${dailyTemp} F<br>
                 ${data.daily[i].weather[0].main}<hr>
                Humidity: ${data.daily[i].humidity}<hr> 
                Wind: ${data.daily[i].wind_speed}
                </div>`
            }

            html += '</div>';
            weatherType(data.daily[0].weather[0].main);

            $('#weather').html(html);

        });
}

function weatherType(weather){
    weather = weather.toLowerCase();
    if (weather === "rain"){
        $('body').css({
            'background-color': 'rgba(25,113,176,0.82)'
        })
        $('.weather-holder').css({
            'background-color': 'rgba(177,203,222,0.82)'
        })
    }else if (weather === 'clear'){
        $('body').css({
            'background-color': 'rgba(29,182,250,0.82)'
        })
        $('.weather-holder').css({
            'background-color': 'rgba(255,223,73,0.98)'
        })
    }else if (weather === 'clouds'){
        $('body').css({
            'background-color': 'rgb(158,186,197)'
        })
        $('.weather-holder').css({
            'background-color': 'rgba(109,115,115,0.98)'
        })
    }else if (weather === 'snow'){
        $('body').css({
            'background-color': 'rgba(141,236,255,0.82)'
        })
        $('.weather-holder').css({
            'background-color': 'rgba(194,234,236,0.98)'
        })
    } else {
        $('body').css({
            'background-color': '#cbffcd'
        })
        $('.weather-holder').css({
            'background-color': '#0fb784'
        })
    }
}

