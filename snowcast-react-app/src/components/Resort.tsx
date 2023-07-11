import { celsiusToF } from './TempUnitSelector';
import { mmToInches } from './HeightUnitSelector';
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
  let snowToday: number | string = resort.forecast.snowToday;
  let eightDaySnowFall: number | string = resort.forecast.eightDaySnowFall;
  const iconCode = resort.forecast.iconCode;
  const flag = resort.details.flag;
  const weatherIcon = `/weather_icons/${iconCode}.png`;
  let currentTemp;
  
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
      <section className="weather-icon">
        <img src={weatherIcon} alt="" />
      </section>
      <section className="forecast-details">
        <div className="snow-temp">
          <div className="snow">
            <img className="snow-icon" src={snowIcon} alt="" />
            <div className="snow-num-unit">
              <div className="snow-today">
                <span className="snow-num">{snowToday}</span>
                <span className="snow-unit">
                  {units.height.heightUnit + '(24hr)'}
                </span>
              </div>
              <div className="snow-8-day">
                <span className="snow-num">{eightDaySnowFall}</span>
                <span className="snow-unit">
                  {units.height.heightUnit + '(8 days)'}
                </span>
              </div>
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