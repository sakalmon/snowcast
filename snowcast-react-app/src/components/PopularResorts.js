import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Resort from './Resort';
import '../assets/stylesheets/PopularResorts.scss';
import Search from './Search';

function PopularResorts() {
  const [snowFallData, setSnowFallData] = useState([]);
  const [resortsVisible, setResortsVisible] = useState(true);

  const getPopularSnowFall = () => {
    const fetched = [];
    const popularResorts = [
      'Perisher',
      'Thredbo',
      'Turoa',
      'Whakapapa',
      'Theodul',
      'Las Lenas',
    ];

    popularResorts.forEach(resort => {    
      if (!(fetched.includes(resort))) {
        fetched.push(resort);
        getLatLonCountry(resort)
          .then(({lat, lon, country, flag}) => getResortSnowFall(resort, lat, lon, country, flag))
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
    const flag = data.results[0].annotations.flag;
    
    return { lat, lon, country, flag };
  };

  const getResortSnowFall = async (resortName, lat, lon, country, flag) => {
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
        return {
          time: hourForecast.dt,
          snowFall: hourForecast.snow['1h']
        };
      } else {
        return 0;
      }
    }).slice(0, 24);

    const eightDaySnowFall = data.daily
      .filter(day => day.snow > 0)
      .reduce((total, day) => total + day.snow, 0)
      .toFixed(2);

    const convHourlySnowFall = hourlySnowFall.map(hourSnowFall => {
      const epoch = hourSnowFall.time;
      const dateObj = new Date(0);
      dateObj.setUTCSeconds(epoch);
      const time = dateObj.getHours();
      let formattedTime = '';

      if (time >= 0 && time < 24) {
        if (time === 12) {
          formattedTime = '12pm';
        } else if (time === 0) {
          formattedTime = '12am';
        } else if (time > 12) {
          formattedTime = (time - 12).toString() + 'pm';
        } else {
          formattedTime = time.toString() + 'am';
        }
      }

      return {
        time: formattedTime,
        hourSnowFall: hourSnowFall.snowFall
      };
    })
      
    return {
      ...newSnowFallData,
      currentTemp: data.current.temp,
      country: country,
      iconCode: data.current.weather[0].icon,
      hourlySnowFall: convHourlySnowFall,
      eightDaySnowFall: eightDaySnowFall,
      flag: flag
    };
  };

  // const hideResorts = () => setResortsVisible(false);

  useEffect(getPopularSnowFall, []);

  return (
    <div className="PopularResorts">
      <Search />
      <div className="resorts-container">
        {resortsVisible && (snowFallData.map((forecast, index) => 
          <Link key={index} to='/resort_forecast' state={{ clickedResort: {
            key: index, 
            resortName: forecast.resortName,
            country: forecast.country,
            snowFallToday: forecast.snowFall,
            eightDaySnowFall: forecast.eightDaySnowFall,
            currentTemp: forecast.currentTemp,
            iconCode: forecast.iconCode,
            hourlySnowFall: forecast.hourlySnowFall,
            flag: forecast.flag
          }}}>
            <Resort
              key={index} 
              resortName={forecast.resortName}
              country={forecast.country}
              snowFallToday={forecast.snowFall}
              eightDaySnowFall={forecast.eightDaySnowFall}
              currentTemp={forecast.currentTemp}
              iconCode={forecast.iconCode}
              hourlySnowFall={forecast.hourlySnowFall}
              flag={forecast.flag}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularResorts;