import './App.scss';
import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PopularResorts from './components/PopularResorts';

class App extends React.Component {
  state = {
    popularResorts: ['Lake Louise Ski Resort'],
    snowFallData: null
  };

  getLatLon = async resortName => {
    const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${resortName}&key=${openCageApiKey}&limit=1`;

    // const res = await fetch(requestUrl);
    // const data = await res.json();
    // const lat = data.results[0].geometry.lat;
    const lat = 51.413042;
    // const lon = data.results[0].geometry.lng;
    const lon = -116.140320;

    return { lat, lon };
  }

  getResortSnowFall = async (lat, lon) => {
    const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

    // const res = await fetch(requestUrl);
    // const data = await res.json();

    const res = await fetch('/sample_data');
    const data = await res.json();
    
    const newSnowFallData = data.hourly
      .filter(hourlyData => hourlyData.weather[0].main === 'Snow')

    return newSnowFallData;
  }

  updateSnowFallData = newSnowFallData => {
    this.setState({
      snowFallData: newSnowFallData
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navigation />
        <PopularResorts
          popularResorts={this.state.popularResorts}
          getLatLon={this.getLatLon}
          getResortSnowFall={this.getResortSnowFall}
          updateSnowFallData={this.updateSnowFallData}
        />
      </div>
    );
  }
}

export default App;
