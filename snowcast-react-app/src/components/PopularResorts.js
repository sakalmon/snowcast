import { useState, useEffect } from 'react';
import Resort from './Resort';

function PopularResorts() {
  const [snowFallData, setSnowFallData] = useState([]);
  const fetched = [];

  const getPopularSnowFall = () => {
    const popularResorts = [
      'Lake Louise Ski Resort',
      'Aspen Ski Resort',
      'Niseko Ski Resort',
      'Yongpyeong Resort',
      'Lenzerheide-Valbella',
      'Whistler Blackcomb'
    ];

    popularResorts.forEach(resort => {    
      console.log(`Getting data for ${resort}`);
      
      if (!(fetched.includes(resort))) {
        console.log(fetched)
        fetched.push(resort);
        console.log(fetched)
        getLatLonCountry(resort)
          .then(({lat, lon, country}) => getResortSnowFall(resort, lat, lon, country))
          .then(newSnowFallData => {
              setSnowFallData(oldSnowFallData => [...oldSnowFallData, newSnowFallData]);              
          });
      }      
    });
  };

  const getLatLonCountry = async resortName => {
    const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${resortName}&key=${openCageApiKey}&limit=1`;

    console.log('Fetching from Open Cage API');
    const res = await fetch(requestUrl);
    const data = await res.json();
    const lat = data.results[0].geometry.lat;
    const lon = data.results[0].geometry.lng;
    const country = data.results[0].components.country;
    
    return { lat, lon, country };
  };

  const getResortSnowFall = async (resortName, lat, lon, country) => {
    const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

    console.log('Fetching from Open Weather API');
    const res = await fetch(requestUrl);
    const data = await res.json();

    const newSnowFallData = data.hourly
      .slice(0, 24)
      .reduce((snowNext24Hours, hourlyForecast) => {
        if (hourlyForecast.snow) {
          snowNext24Hours.snowFall += hourlyForecast.snow['1h'];
        }

        return snowNext24Hours;
      }, { resortName: resortName, snowFall: 0 });

    newSnowFallData.snowFall = newSnowFallData.snowFall.toFixed(2);

    const hourlySnowFall = data.hourly.map(hourForecast => {
      if (hourForecast.snow) {
        return hourForecast.snow['1h'];
      } else {
        return 0;
      }
    }).slice(0, 24);
      
    return {
      ...newSnowFallData,
      currentTemp: data.current.temp,
      country: country,
      iconCode: data.current.weather[0].icon,
      hourlySnowFall: hourlySnowFall
    };
  };

  useEffect(getPopularSnowFall, []);

  return (
    <div className="PopularResorts">
      {snowFallData.map((forecast, index) => 
        <Resort
          key={index} 
          resortName={forecast.resortName}
          country={forecast.country}
          snowFallToday={forecast.snowFall}
          currentTemp={forecast.currentTemp}
          iconCode={forecast.iconCode}
          hourlySnowFall={forecast.hourlySnowFall}
        />
      )}
    </div>
  );
}

export default PopularResorts;