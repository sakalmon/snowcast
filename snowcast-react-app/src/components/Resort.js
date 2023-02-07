import temperatureIcon from '../assets/temperature.png';
import snowIcon from '../assets/snow.png';

function Resort(props) {
  const { resortName, country, snowFallToday, currentTemp, handleClick, iconCode } = props;

  const iconLink = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="Resort" onClick={() => handleClick(props)}>
      <section className="forecast-details">
        <p className="name">{resortName}</p>
        <p className="country">{country}</p>
        <div className="snow-temp">
          <div className="snow">
            <img className="snow-icon" src={snowIcon} alt="" /><span>{snowFallToday}mm</span>
          </div>
          <div className="temp">
            <img className="temp-icon" src={temperatureIcon} alt="" /><span>{currentTemp} &deg;C</span>
          </div>
        </div>        
      </section>
      <section className="weather-icon">
        <img src={iconLink} alt="" />
      </section>
    </div>
  );
}

export default Resort;