// const Resort = {
//   getResortSnowFall: resortName => {
//     const openCageApiKey = process.env.OPEN_CAGE_API_KEY;
//     var snowFallData = null;
    
//     const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${resortName}&key=${openCageApiKey}&limit=1`;

//     fetch(requestUrl)
//       .then(res => res.json())
//       .then(data => {
//         const lat = data.results[0].geometry.lat;
//         const lon = data.results[0].geometry.lng;

//         const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
//         const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

//         fetch(requestUrl)
//           .then(res => res.json())
//           .then(data => {
//             snowFallData = data.hourly.filter(hourlyData => hourlyData.weather[0].main === 'Snow');
//           });
//       });
    
//     return snowFallData;
//   }
// }

// module.exports = Resort;