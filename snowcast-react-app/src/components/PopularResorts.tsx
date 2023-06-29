import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Resort from './Resort';
import '../assets/stylesheets/PopularResorts.scss';
import Search from './Search';
import UnitSelector from '../components/UnitSelector';
import type { IHourlySnowFall, IiconCode } from '../types';

function PopularResorts() {
  interface ISnowFallData {
    country: string;
    currentTemp: number;
    eightDaySnowFall: string;
    flag: string;
    hourlySnowFall: IHourlySnowFall;
    iconCode: IiconCode;
    resortName: string;
    snowFall: string;
  }

  const [snowFallData, setSnowFallData] = useState<ISnowFallData[]>([]);
  const [resortsVisible, setResortsVisible] = useState(true);
  const [unit, setUnit] = useState('C');
  
  const getPopularSnowFall = () => {
    const fetched: string[] = [];
    const popularResorts = [
      'Perisher',
      'Thredbo',
      'Turoa',
      'Whakapapa',
      'Theodul',
      'Las Lenas',
    ];

    popularResorts.forEach(resortName => {    
      if (!(fetched.includes(resortName))) {
        fetched.push(resortName);
        getLatLonCountry(resortName)
          .then(({lat, lon, country, flag}) => getResortSnowFall({resortName, lat, lon, country, flag}))
          .then(newSnowFallData => {
              console.log(newSnowFallData);
              setSnowFallData(oldSnowFallData => [...oldSnowFallData, newSnowFallData]);
          });
      }      
    });
  };

  const getLatLonCountry = async (resortName: string) => {
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

  interface IResortSnowFall {
    resortName: string;
    lat: number;
    lon: number;
    country: string;
    flag: string;
  }

  const getResortSnowFall = async ({ resortName, lat, lon, country, flag }: IResortSnowFall) => {
    const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

    console.log('Fetching from Open Weather API');
    const res = await fetch(requestUrl);
    const data = await res.json();

    interface ISnowNext24Hours {
      resortName: string;
      snowFall: number;
    }

    interface ISnowFall {
      snow: {
        '1h': number
      };
    }

    const newSnowFallData = data.hourly
      .slice(0, 24)
      .reduce((snowNext24Hours: ISnowNext24Hours, hourlyForecast: ISnowFall) => {
        if (hourlyForecast.snow) {
          snowNext24Hours.snowFall += hourlyForecast.snow['1h'];
        }

        return snowNext24Hours;
      }, { resortName: resortName, snowFall: 0 });

    newSnowFallData.snowFall = newSnowFallData.snowFall.toFixed(2);

    interface IHourlySnowFall {
      dt: number;
      temp: number;
      snow?: {
        '1h': number;
      };
    }

    interface IDayData {
      dt: number;
      temp: {
        day: number;
      };
      snow?: number;
    }
    
    const hourlySnowFall: Array<{ time: number; snowFall: number }> = data.hourly.map((hourForecast: IHourlySnowFall) => {
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
      .filter((day: IDayData) => {
        if (day.snow) {
          return day.snow > 0
        }
      })
      .reduce((total: number, day: { snow: number }) => total + day.snow, 0)
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

  interface IResortData {
    snowFall: string;
    eightDaySnowFall: string[];
    currentTemp: string;
    iconCode: IiconCode;
    hourlySnowFall: IHourlySnowFall;
    resortName: string;
    lat: number;
    lon: number;
    country: string;
    flag: string;
  }

  return (
    <div className="PopularResorts">
      <UnitSelector />
      <Search />
      <div className="resorts-container">
        {resortsVisible && (snowFallData.map((forecast: ISnowFallData, index) => 
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