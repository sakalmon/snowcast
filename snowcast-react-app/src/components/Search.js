import { useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import '../assets/stylesheets/Search.scss';
import '../assets/stylesheets/SearchResult.scss';

function Search({ hideResorts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchedSnowFallData, setSearchedSnowFallData] = useState([]);
  const fetched = [];

  const getSearchedSnowFall = () => {
    searchResults.forEach(resort => {    
      if (!(fetched.includes(resort.formattedName))) {
        fetched.push(resort);
        getResortSnowFall(resort.formattedName, resort.lat, resort.lon, resort.country, resort.flag)
          .then(newSnowFallData => {
              setSearchedSnowFallData(oldSnowFallData => [...oldSnowFallData, newSnowFallData]);              
          });
      }
    });
  }

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
      flag: flag
    };
  };
  
  const handleContentChange = event => setSearchQuery(event.target.value);

  const getSearchResults = async query => {
    hideResorts();
    document.querySelectorAll('.SearchResult').forEach(element => element.remove())

    const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${openCageApiKey}&limit=10`;

    console.log('Fetching from Open Cage API');
    const res = await fetch(requestUrl);
    const data = await res.json();
    
    const newResults = data.results.map(apiResult => {
      return {
        formattedName: apiResult.formatted,
        lat: apiResult.geometry.lat,
        lon: apiResult.geometry.lng,
        country: apiResult.components.country,
        flag: apiResult.annotations.flag
      };
    });

    setSearchResults(newResults);
  }

  useEffect(getSearchedSnowFall, [searchResults]);

  const handleInputClick = event => {
    const inputDOM = event.target;
    inputDOM.value = '';
    inputDOM.style.color = 'black';
  }

  return (
    <div className="Search">
      <div className="search-box">
        <form onSubmit={event => {
          event.preventDefault();
          getSearchResults(searchQuery);
        }}>
          <i className="fa-solid fa-magnifying-glass fa-xl"></i>
          <input type="text" onChange={handleContentChange} value={searchQuery || "Search Ski Resorts"} style={{color:'grey'}} onClick={handleInputClick} />
          <button onClick={() => getSearchResults(searchQuery)}>Search</button>
        </form>
      </div>
      <div className="search-results">
        {searchedSnowFallData.map((resort, index) => {
          return <SearchResult key={index} result={resort} />
        })}
      </div>
    </div>
  );
}

export default Search;