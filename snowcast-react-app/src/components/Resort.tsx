import { celsiusToF } from './TempUnitSelector';
import { mmToInches } from './HeightUnitSelector';
import snowIcon from '../assets/snow.png';
import '../assets/stylesheets/Resort.scss'
import type { IResortData, IUnits } from '../types/allTypes';

/*==============================================================================
  Functional Component
==============================================================================*/
function Resort({ resort, units }: {resort: IResortData; units: IUnits}) {
  // Data to be displayed for each resort
  const resortName = resort.name;
  let snowToday: number | string = resort.forecast.snowToday;
  let eightDaySnowFall: number | string = resort.forecast.eightDaySnowFall;
  const iconCode = resort.forecast.iconCode;
  const flag = resort.details.flag;
  const weatherIcon = `/weather_icons/${iconCode}.png`;
  const weatherDesc = resort.forecast.weatherDesc;
  let currentTemp;
  
  // Unit conversions
  if (units.temp.tempUnit === 'C') {
    currentTemp = resort.forecast.currentTemp;
  } else {
    currentTemp = celsiusToF(resort.forecast.currentTemp);
  }

  if (units.height.heightUnit === 'Inches') {
    snowToday = mmToInches(snowToday).toFixed(2);
    eightDaySnowFall = mmToInches(eightDaySnowFall).toFixed(2);
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
      <section className="current-weather">
        <div className="weather-icon-status">
          <img className="weather-icon" src={weatherIcon} alt="" />
          <span className="weather-status">{weatherDesc}</span>
        </div>
        <div className="temp">
          <span className="temp-num">{currentTemp}&deg;</span>
        </div>
      </section>
      <section className="forecast-details">
        <div className="snow-temp">
          <img className="snow-icon" src={snowIcon} alt="" />
          <div className="snow-today">
            <span className="heading">24 Hrs</span>
            <div className="snow-today-container">
              <span className="snow-num">{snowToday}</span>
            </div>
          </div>
          <div className="snow-8-day">
            <span className="heading">8 Days</span>
            <div className="snow-8-day-container">
              <span className="snow-num">{eightDaySnowFall}</span>
            </div>
          </div>
        </div>        
      </section>
    </div>
  );
}

export default Resort;