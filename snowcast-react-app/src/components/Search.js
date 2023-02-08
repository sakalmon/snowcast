import { useState, useEffect } from 'react';
import SearchResult from './SearchResult';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchedSnowFallData, setSearchedSnowFallData] = useState([]);
  const fetched = [];

  const getSearchedSnowFall = () => {
    searchResults.forEach(resort => {    
      console.log(`Getting data for ${resort.formattedName}`);
      
      if (!(fetched.includes(resort.formattedName))) {
        fetched.push(resort);
        getResortSnowFall(resort.formattedName, resort.lat, resort.lon, resort.country)
          .then(newSnowFallData => {
              setSearchedSnowFallData(oldSnowFallData => [...oldSnowFallData, newSnowFallData]);              
          });
      }
    });
  }

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
  
  const handleContentChange = event => setSearchQuery(event.target.value);

  const getSearchResults = async query => {
    const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${openCageApiKey}&limit=10`;

    console.log('Fetching from Open Cage API');
    const res = await fetch(requestUrl);
    const data = await res.json();
    
    const newResults = data.results.map(apiResult => {
      // const formattedName = `${apiResult.components.village} ${apiResult.components.state_code} - ${apiResult.components.country}`;
      return {
        formattedName: apiResult.formatted,
        lat: apiResult.geometry.lat,
        lon: apiResult.geometry.lng,
        country: apiResult.components.country
      };
    });

    console.log(newResults)

    setSearchResults(newResults);
  }

  useEffect(getSearchedSnowFall, [searchResults])

  return (
    <div className="Search">
      <h1>Search for a ski resort</h1>
      <input type="text" onChange={handleContentChange}/>
      <button onClick={() => getSearchResults(searchQuery)}>Search</button>
      {searchedSnowFallData.map((resort, index) => {
        console.log('Resort:')
        console.log(resort)
        return <SearchResult key={index} result={resort} />
      })}
    </div>
  );
}

export default Search;