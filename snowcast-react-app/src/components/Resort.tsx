import temperatureIcon from '../assets/temperature.png';
import snowIcon from '../assets/snow.png';
import '../assets/stylesheets/Resort.scss'
import type { IForecast, IResortDetails, IResortData } from '../types';

/*==============================================================================
  Functional Component
==============================================================================*/
function Resort({ resort }: { resort: IResortData }) {
  // Data to be displayed for each resort
  const resortName = resort.name;
  const snowToday = (resort.forecast as IForecast).snowToday;
  const eightDaySnowFall = (resort.forecast as IForecast).eightDaySnowFall;
  const currentTemp = (resort.forecast as IForecast).currentTemp;
  const iconCode = (resort.forecast as IForecast).iconCode;
  const flag = (resort.details as IResortDetails).flag;
  const weatherIcon = `/weather_icons/${iconCode}.png`;

  /*============================================================================
    Component JSX
  ============================================================================*/
  return (
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
              <span className="snow-num">{snowToday}</span>
              <span className="snow-unit">(mm)</span>
              <span className="snow-num">{eightDaySnowFall}</span>
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
  );
}

export default Resort;