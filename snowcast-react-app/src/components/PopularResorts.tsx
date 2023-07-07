import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Resort from './Resort';
import '../assets/stylesheets/PopularResorts.scss';
import Search from './Search';
import UnitSelector from '../components/UnitSelector';
import { SnowResort } from '../SnowResort';
import type { IResortData, IResortDetails } from '../types';

// =============================================================================
// Function Definitions
// =============================================================================
const createResorts = (): SnowResort[] => {
  return SnowResort.popularResorts.map(resortName =>
    new SnowResort(resortName)
  );
}

export const getAllResortData = (resorts: SnowResort[]) => {
  return resorts.map(resort => resort.getResortData());
};

// =============================================================================
// Component Logic
// =============================================================================
function PopularResorts() {
  // Data for all of our resorts
  const [ resorts, setResorts ] = useState<IResortData[]>([]);

  // For toggling temperature units
  const [ unit, setUnit ] = useState('C');

  // Instantiate and store all popular resorts
  useEffect(() => {
    const resortObjs = createResorts();
    const allResortData = getAllResortData(resortObjs);

    Promise.all(allResortData).then(a => {
      const allResortData: IResortData[] = a.map(resortData => {
        return {
          name: resortData.name,
          details: resortData.details,
          forecast: resortData.forecast
        };
      });

      setResorts(allResortData)
    });

  }, []);
  
  // setResorts(allResorts);

  // const getAllSnowFall = () => {
  //   const resortsFetched: string[] = [];
    
  //   PopularResort.popularResorts.forEach(resortName => {
  //     if (!(resortsFetched.includes(resortName))) {
  //       resortsFetched.push(resortName);
  //       getLatLonCountry(resortName)
  //         .then(({lat, lon, country, flag}) => getResortSnowFall({resortName, lat, lon, country, flag}))
  //         .then(newSnowFallData => {
  //             setSnowFallData(oldSnowFallData => [...oldSnowFallData, newSnowFallData]);
  //         });
  //     }      
  //   });
  // };

  // const getResortSnowFall = async ({ resortName, lat, lon, country, flag }: IResortSnowFall) => {
  //   const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  //   const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

  //   console.log('Fetching from Open Weather API');
  //   const res = await fetch(requestUrl);
  //   const data = await res.json();

  //   interface ISnowNext24Hours {
  //     resortName: string;
  //     snowFall: number;
  //   }

  //   interface ISnowFall {
  //     snow: {
  //       '1h': number
  //     };
  //   }

  //   const newSnowFallData = data.hourly
  //     .slice(0, 24)
  //     .reduce((snowNext24Hours: ISnowNext24Hours, hourlyForecast: ISnowFall) => {
  //       if (hourlyForecast.snow) {
  //         snowNext24Hours.snowFall += hourlyForecast.snow['1h'];
  //       }

  //       return snowNext24Hours;
  //     }, { resortName: resortName, snowFall: 0 });

  //   newSnowFallData.snowFall = newSnowFallData.snowFall.toFixed(2);

  //   interface IHourlySnowFall {
  //     dt: number;
  //     temp: number;
  //     snow?: {
  //       '1h': number;
  //     };
  //   }

  //   interface IDayData {
  //     dt: number;
  //     temp: {
  //       day: number;
  //     };
  //     snow?: number;
  //   }
    
  //   const hourlySnowFall: Array<{ time: number; snowFall: number }> = data.hourly.map((hourForecast: IHourlySnowFall) => {
  //     if (hourForecast.snow) {
  //       return {
  //         time: hourForecast.dt,
  //         snowFall: hourForecast.snow['1h']
  //       };
  //     } else {
  //       return 0;
  //     }
  //   }).slice(0, 24);

  //   const eightDaySnowFall = data.daily
  //     .filter((day: IDayData) => {
  //       if (day.snow) {
  //         return day.snow > 0
  //       }
  //     })
  //     .reduce((total: number, day: { snow: number }) => total + day.snow, 0)
  //     .toFixed(2);

  //   const convHourlySnowFall = hourlySnowFall.map(hourSnowFall => {
  //     const epoch = hourSnowFall.time;
  //     const dateObj = new Date(0);
  //     dateObj.setUTCSeconds(epoch);
  //     const time = dateObj.getHours();
  //     let formattedTime = '';

  //     if (time >= 0 && time < 24) {
  //       if (time === 12) {
  //         formattedTime = '12pm';
  //       } else if (time === 0) {
  //         formattedTime = '12am';
  //       } else if (time > 12) {
  //         formattedTime = (time - 12).toString() + 'pm';
  //       } else {
  //         formattedTime = time.toString() + 'am';
  //       }
  //     }

  //     return {
  //       time: formattedTime,
  //       hourSnowFall: hourSnowFall.snowFall
  //     };
  //   })
      
  //   return {
  //     ...newSnowFallData,
  //     currentTemp: data.current.temp,
  //     country: country,
  //     iconCode: data.current.weather[0].icon,
  //     hourlySnowFall: convHourlySnowFall,
  //     eightDaySnowFall: eightDaySnowFall,
  //     flag: flag
  //   };
  // };

  // useEffect(getAllSnowFall, []);

// =============================================================================
// Component JSX
// =============================================================================
  return (
    <div className="PopularResorts">
      <UnitSelector />
      <Search />
      <div className="resorts-container">
        {(resorts.map((resort, index) => 
          <Link key={index} to='/resort_forecast' state={{ resort }}>
            <Resort resort={resort} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularResorts;