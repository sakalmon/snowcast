import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Resort from './Resort';
import '../assets/stylesheets/PopularResorts.scss';
import Search from './Search';
import UnitSelector from '../components/UnitSelector';
import type {
  IHourlySnowFall, ITimeFormattedHourlySnowFall, IIconCode
} from '../types';

type NewIconCode = '01d' | '01n' | '02d' | '02n' | '03d' | '03n' | '04d'
  | '04n' | '09d' | '09n' | '10d' | '10n' | '11d' | '11n' | '13d' | '13n'
  | '50d' | '50n';

interface IForecast extends ISnowFall {
  currentTemp: number;
  iconCode: NewIconCode;
}

interface ISnowFall {
  snowToday: number;
  hourlySnowFall: ITimeFormattedHourlySnowFall[] | {};
  eightDaySnowFall: number;
}

interface IResortDetails {
  lat: number;
  lon: number;
  country: string;
  flag: string;
}

interface IOpenW {
  lat: number;
  lon: number;
  current: IOpenWCurrent;
  hourly: IOpenWHourly[];
  daily: IOpenWDaily[];
}

interface IOpenWCurrent {
  dt: number;
  temp: number;
  weather: { icon: NewIconCode }[];
}

interface IOpenWDaily {
  dt: number;
  temp: number;
  weather: { icon: NewIconCode }[];
  snow?: number;
}

interface IOpenWHourly {
  dt: number;
  temp: number;
  weather: { icon: NewIconCode }[];
  snow?: { 
    '1h': number;
  };
}

function PopularResorts() {
  class SnowResort {
    name: string;
    details: Promise<void | IResortDetails> | {};
    openWResponse: Promise<void | IOpenW> | {};
    forecast: IForecast | {};

    constructor(resortName: string) {
      // Set initial resort attributes
      this.name = resortName;
      this.details = {};
      this.openWResponse = {};
      this.forecast = {};

      // Populate attributes
      this.getResortDetails(this.name)
        .then(details => {
          this.details = details;
          return this.fetchOpenWeather(details.lat, details.lon)
        })
        .then(openWResponse => {
          this.openWResponse = openWResponse;
          return this.getForecast(openWResponse);
        })
        .then(forecast => {
          this.forecast = forecast;
        });
    }

    popularResorts = [
      'Perisher',
      'Thredbo',
      'Turoa',
      'Whakapapa',
      'Theodul',
      'Las Lenas'
    ];

    fetchOpenWeather = async (lat: number, lon: number): Promise<IOpenW> => {
      const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
      const requestUrl = 
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}\
        &appid=${openWeatherApiKey}&units=metric`;
  
      console.log('Fetching from Open Weather API');

      const res = await fetch(requestUrl);
      const openWResponse: IOpenW = await res.json();

      return openWResponse;
    };

    getForecast = (openWResponse: IOpenW): IForecast => {
      const currentTemp = this.getCurrentTemp(openWResponse);
      const iconCode = openWResponse.current.weather[0].icon;
      const snowToday = this.getTodaysSnowFall(openWResponse.hourly);
      const hourlySnowFall = this.getHourlySnowFall(openWResponse.hourly);
      const eightDaySnowFall = this.getEightDaySnowFall(openWResponse);

      return {
        currentTemp,
        iconCode,
        snowToday,
        hourlySnowFall,
        eightDaySnowFall
      };
    };

    getResortDetails = async (resortName: string): Promise<IResortDetails> => {
      const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
      const requestUrl = `https://api.opencagedata.com/geocode/v1/json?\
      q=${resortName}&key=${openCageApiKey}&limit=1`;
  
      console.log('Fetching from Open Cage API');

      const res = await fetch(requestUrl);
      const data = await res.json();

      const lat = data.results[0].geometry.lat;
      const lon = data.results[0].geometry.lng;      
      const country = data.results[0].components.country;
      const flag = data.results[0].annotations.flag;
      
      return { lat, lon, country, flag };
    }

    getTodaysSnowFall = (hourlyData: IOpenWHourly[]) => {
      const todaysSnowFall = hourlyData
        .reduce((snowToday, hourlySnowFall) => {
          if (hourlySnowFall.snow) {
            return snowToday + hourlySnowFall.snow['1h'];
          } else {
            return snowToday;
          }
        }, 0)
        .toFixed(2);

      return Number(todaysSnowFall);
    };

    getHourlySnowFall = (hourlyData: IOpenWHourly[]): IHourlySnowFall[] => {
      return hourlyData
        .slice(0, 24)
        .map((hourForecast) => {
          if (hourForecast.snow) {
            return {
              time: hourForecast.dt,
              snow: hourForecast.snow['1h']
            };
          } else {
            return {
              time: hourForecast.dt,
              snow: 0
            };
          }
        });
    }

    getEightDaySnowFall = (openWResponse: IOpenW) => {
      const eightDaySnowFall = openWResponse.daily
        .filter(day => {
          if (day.snow) {
            return day.snow > 0;
          }
        })
        .reduce((eightDaySnowFall, day) => {
          if (day.snow) {
            return eightDaySnowFall + day.snow;
          } else {
            return eightDaySnowFall;
          }
        }, 0)
        .toFixed(2);

      return Number(eightDaySnowFall)
    }

    epochTo12Hr = (hourlySnowFall: IHourlySnowFall[]):
    ITimeFormattedHourlySnowFall[] => {
      return hourlySnowFall.map(hourSnowFall => {
        const epoch = hourSnowFall.time;
        const dateObj = new Date(0);
        dateObj.setUTCSeconds(epoch);
        const time = dateObj.getHours();
        let formattedTime = '';
  
        if (time === 12) {
          formattedTime = '12pm';
        } else if (time === 0) {
          formattedTime = '12am';
        } else if (time > 12) {
          formattedTime = (time - 12).toString() + 'pm';
        } else {
          formattedTime = time.toString() + 'am';
        }

        return {
          time: formattedTime,
          snow: hourSnowFall.snow
        };
      });
    }

    getSnowFall = async (openWResponse: IOpenW): Promise<ISnowFall> => {
      const hourlyData = openWResponse.hourly.slice(0, 24);
  
      const todaysSnowFall = this.getTodaysSnowFall(hourlyData)
      const hourlySnowFall = this.getHourlySnowFall(hourlyData);
      const timeFormattedHourlySnowFall = this.epochTo12Hr(hourlySnowFall);
      const eightDaySnowFall = this.getEightDaySnowFall(openWResponse);

      return {
        snowToday: todaysSnowFall,
        hourlySnowFall: timeFormattedHourlySnowFall,
        eightDaySnowFall: eightDaySnowFall
      };
    };

    getCurrentTemp = (openWResponse: IOpenW) => {
      return openWResponse.current.temp;
    }
  }

  // ==========================================================================

  const [snowFallData, setSnowFallData] = useState<ISnowFallData[]>([]);
  const [unit, setUnit] = useState('C');
  
  const getAllSnowFall = () => {
    const resortsFetched: string[] = [];
    
    PopularResort.popularResorts.forEach(resortName => {    
      if (!(resortsFetched.includes(resortName))) {
        resortsFetched.push(resortName);
        getLatLonCountry(resortName)
          .then(({lat, lon, country, flag}) => getResortSnowFall({resortName, lat, lon, country, flag}))
          .then(newSnowFallData => {
              setSnowFallData(oldSnowFallData => [...oldSnowFallData, newSnowFallData]);
          });
      }      
    });
  };

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

  useEffect(getAllSnowFall, []);

  return (
    <div className="PopularResorts">
      <UnitSelector />
      <Search />
      <div className="resorts-container">
        {(snowFallData.map((forecast: ISnowFallData, index) => 
          <Link key={index} to='/resort_forecast' state={{ clickedResort: {
            key: index, 
            resortName: forecast.resortName,
            country: forecast.country,
            snowToday: forecast.snowFall,
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
              snowToday={forecast.snowFall}
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