import temperatureIcon from '../assets/temperature.png';
import snowIcon from '../assets/snow.png';
import { Link } from 'react-router-dom';
import '../assets/stylesheets/Resort.scss'

function Resort(props) {
  const { resortName, snowFallToday, currentTemp, iconCode, flag } = props;
  const weatherIcon = `/weather_icons/${iconCode}.png`;

  return (
    <Link to='/resort_forecast' state={{ clickedResort: props }}>
      <div className="Resort">
        <div className="name-flag">
          <p className="name">{resortName}</p>
          <p className="flag">{flag}</p>
        </div>
        <section className="weather-icon">
          <img src={weatherIcon} alt="" />
        </section>
        <section className="forecast-details">
          <div className="snow-temp">
            <div className="snow">
              <img className="snow-icon" src={snowIcon} alt="" />
              <div className="snow-num-unit">
                <span className="snow-num">{snowFallToday}</span>
                <span className="snow-unit">(mm)</span>
              </div>
            </div>
            <div className="temp">
              <img className="temp-icon" src={temperatureIcon} alt="" />
              <div className="temp-num-unit">
                <span className="temp-num">{currentTemp}</span>
                <span className="temp-unit">(&deg;C)</span>
              </div>
            </div>
          </div>        
        </section>
      </div>
    </Link>
  );
}

export default Resort;