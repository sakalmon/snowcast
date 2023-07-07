import { useState } from 'react';
import SearchResult from './SearchResult';
import '../assets/stylesheets/Search.scss';
import '../assets/stylesheets/SearchResult.scss';
import { SearchObj } from '../SearchObj';
import type { IResortData } from '../types';

// =============================================================================
// Function Definitions
// =============================================================================
const getSearchResults = (query: string): IResortData[] | [] => {
  const searchObj = new SearchObj(query);
  return searchObj.getResults();
}

const handleContentChange = (
  event: React.FormEvent<HTMLInputElement>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setSearchQuery((event.target as HTMLInputElement).value);
};

const handleInputClick = (
  event: React.MouseEvent<HTMLInputElement>,
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setSearchColor: React.Dispatch<React.SetStateAction<'grey' | 'black'>>
  ) => {
  if (searchQuery === 'Search Ski Resorts') {
    setSearchQuery('');
  }
  setSearchColor('black');
}

const handleInputBlur = (
  event: React.FocusEvent<HTMLInputElement>,
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  ) => {
  if (searchQuery === '') {
    setSearchQuery('Search Ski Resorts');
  }
}

const handleSearch = (
  event: React.FormEvent<HTMLFormElement>,
  searchQuery: string,
  setSearchResults: React.Dispatch<React.SetStateAction<IResortData[]>>
  ) => {
  event.preventDefault();
  const searchResults = getSearchResults(searchQuery)
  setSearchResults(searchResults);
};

function Search() {
// =============================================================================
// State Hooks
// =============================================================================
  const [ searchQuery, setSearchQuery ] = useState('Search Ski Resorts');
  const [ searchResults, setSearchResults ] = useState<IResortData[]>([]);
  const [ showResults, setShowResults ] = useState(true);
  const [ searchColor, setSearchColor ] = useState<'grey' | 'black'>('grey');

// =============================================================================
// Component JSX
// =============================================================================
  return (
    <div className="Search">
      <div className="search-container">
        <div className="search-box">
          <form onSubmit={event => handleSearch(
            event,
            searchQuery,
            setSearchResults
          )}>
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            <input
              type="text"
              onChange={event => handleContentChange(event, setSearchQuery)}
              value={searchQuery}
              onClick={event => handleInputClick(
                event,
                searchQuery,
                setSearchQuery,
                setSearchColor
              )}
              onBlur={event => handleInputBlur(
                event,
                searchQuery,
                setSearchQuery
              )} 
              style={{ color: searchColor }}
            />
            <button>Search</button>
            <div></div>
          </form>
        </div>
        <div className="search-results">
          {showResults && searchResults.map((resort, index: number) => {
            return <SearchResult key={index} resort={resort} />
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;

// const getResortSnowFall = async ({ formattedName, lat, lon, country, flag }: ISearchResult) => {
//   const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

//   const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

//   console.log('Fetching from Open Weather API');
//   const res = await fetch(requestUrl);
//   const data = await res.json();

//   const newSnowFallData = data.hourly
//     .slice(0, 24)
//     .reduce((snowNext24Hours: ISnowNext24Hours, hourlyForecast: IHourlyForecast) => {
//       if (hourlyForecast.snow) {
//         snowNext24Hours.snowFall += hourlyForecast.snow['1h'];
//       }

//       return snowNext24Hours;
//     }, { resortName: formattedName, snowFall: 0 });

//   newSnowFallData.snowFall = newSnowFallData.snowFall.toFixed(2);

//   const hourlySnowFall: IHourlySnowFall[] = data.hourly.map((hourForecast: IHourlyForecast) => {
//     if (hourForecast.snow) {
//       return {
//         time: hourForecast.dt,
//         snowFall: hourForecast.snow['1h']
//       };
//     } else {
//       return 0;
//     }
//   }).slice(0, 24);

//   const convHourlySnowFall = hourlySnowFall.map((hourSnowFall) => {
//     let epoch: string | number;

//     if (typeof hourSnowFall.time === 'string') {
//       epoch = Number(hourSnowFall.time);
//     } else {
//       epoch = hourSnowFall.time;
//     }

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
//       hourSnowFall: hourSnowFall.snow
//     };
//   });
// const eightDaySnowFall = data.daily
//     .filter((day: IDay) => day.snow > 0)
//     .reduce((total: number, day: IDay) => total + day.snow, 0)
//     .toFixed(2);
    
//   return {
//     ...newSnowFallData,
//     currentTemp: data.current.temp,
//     country: country,
//     iconCode: data.current.weather[0].icon,
//     hourlySnowFall: convHourlySnowFall,
//     eightDaySnowFall: eightDaySnowFall,
//     flag: flag
//   };

// const alreadyFetched = (array: ISearchResult[], resortName: string): boolean => {
//   for (let i = 0; i < array.length; i++) {
//     if (array[i].formattedName === resortName) {
//       return true;
//     }
//   }

//   return false;
// }

// const getSearchedSnowFall = () => {
//   const fetched: ISearchResult[] = [];
  
//   searchResults.forEach(({ formattedName, lat, lon, country, flag }: ISearchResult) => {

//     if (!(alreadyFetched(fetched, formattedName))) {
//       const resort = {
//         formattedName,
//         lat,
//         lon,
//         country,
//         flag
//       };

//       fetched.push(resort);

//       getResortSnowFall(resort)
//         .then(newSnowFallData => {
//             setSearchedSnowFallData(oldSnowFallData => [...oldSnowFallData, newSnowFallData]);
//             setPrevSearchResults(oldSnowFallData => [...oldSnowFallData, newSnowFallData]);
//         });
//     }
//   });
// };

// interface ISearchResult {
//   formattedName: string;
//   lat: number;
//   lon: number;
//   country: string;
//   flag: string;
// }

// interface IApiResult {
//   formatted: string;
//   geometry: {
//     lat: number;
//     lng: number;
//   };
//   components: {
//     country: string
//   };
//   annotations: {
//     flag: string;    
//   }
// }

// interface IDay {
//   snow: number;
// }

// interface ISnowNext24Hours {
//   snowFall: number;
// }

// interface IHourlyForecast {
//   dt: number;
//   snow: {
//     '1h': number;
//   };
// }
