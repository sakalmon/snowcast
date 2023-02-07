import './App.scss';
import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PopularResorts from './components/PopularResorts';

class App extends React.Component {
  state = {
    popularResorts: ['Lake Louise Ski Resort', 'Aspen Ski Resort'],
    snowFallData: []
  };

  componentDidMount() {
    console.log('Component mounted');
    
    this.state.popularResorts.forEach(resort => {    
      console.log(`Getting data for ${resort}`);
      const snowFallData = this.getLatLonCountry(resort)
        .then(({lat, lon, country}) => this.getResortSnowFall(resort, lat, lon, country))
        .then(newSnowFallData => {
          if (!this.checkIfDuplicate(newSnowFallData)) {
            this.setState({
              snowFallData: [...this.state.snowFallData, newSnowFallData]
            });
          }
        });

      console.log(snowFallData);
    });
  }

  checkIfDuplicate = snowFallData => {
    let duplicate = false;

    this.state.snowFallData.forEach(stateData => {
      if (stateData.resortName === snowFallData.resortName) {
        duplicate = true;
      }
    });

    return duplicate;
  }

  getLatLonCountry = async resortName => {
    const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${resortName}&key=${openCageApiKey}&limit=1`;

    console.log('Fetching from Open Cage API');
    const res = await fetch(requestUrl);
    const data = await res.json();
    const lat = data.results[0].geometry.lat;
    const lon = data.results[0].geometry.lng;
    const country = data.results[0].components.country;
    
    // const lat = 51.413042;
    // const lon = -116.140320;
    // const country = 'Canada';
    console.log(lat, lon, country)
    return { lat, lon, country };
  }

  getResortSnowFall = async (resortName, lat, lon, country) => {
    const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

    console.log('Fetching from Open Weather API');
    // const res = await fetch('/sample_data');
    // const data = await res.json();
    const res = await fetch(requestUrl);
    const data = await res.json();

    const newSnowFallData = data.hourly
      .filter(hourlyData => hourlyData.weather[0].main === 'Snow')
      .reduce((snowNext24Hours, hourlyForecast) => {
        snowNext24Hours.snowFall += hourlyForecast.snow['1h'];
        return snowNext24Hours;
      }, { resortName: resortName, snowFall: 0 })

      // console.log({
      //   ...newSnowFallData,
      //   currentTemp: data.current.temp,
      //   country: country
      // })

    return {
      ...newSnowFallData,
      currentTemp: data.current.temp,
      country: country
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navigation />
        <PopularResorts
          snowFallData={this.state.snowFallData}
        />
      </div>
    );
  }
}

export default App;
