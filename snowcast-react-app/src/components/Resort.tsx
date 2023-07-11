import { celsiusToF } from './TempUnitSelector';
import temperatureIcon from '../assets/temperature.png';
import snowIcon from '../assets/snow.png';
import '../assets/stylesheets/Resort.scss'
import type { IResortData, IUnits } from '../types/allTypes';

/*==============================================================================
  Functional Component
==============================================================================*/
function Resort({ resort, units }: {
  resort: IResortData;
  units: IUnits;
}) {
  // Data to be displayed for each resort
  const resortName = resort.name;
  const snowToday = resort.forecast.snowToday;
  const eightDaySnowFall = resort.forecast.eightDaySnowFall;
  const iconCode = resort.forecast.iconCode;
  const flag = resort.details.flag;
  const weatherIcon = `/weather_icons/${iconCode}.png`;
  let currentTemp;
  
  if (units.temp.tempUnit === 'C') {
    currentTemp = resort.forecast.currentTemp;
  } else {
    currentTemp = celsiusToF(resort.forecast.currentTemp);
  }

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
              <span className="temp-unit">&deg;{units.temp.tempUnit}</span>
            </div>
          </div>
        </div>        
      </section>
    </div>
  );
}

export default Resort;