import { useLocation } from 'react-router-dom';
import Resort from '../components/Resort';
import SearchBox from './SearchBox';
import TempUnitSelector from './TempUnitSelector';
import HeightUnitSelector from './HeightUnitSelector';
import { useUnitContext } from '../UnitContext';
import '../assets/stylesheets/ResortForecast.scss';
import { IResortData, ITempUnit, IHeightUnit, IUnitContext } from '../types/allTypes';

/*==============================================================================
  Function Definitions
==============================================================================*/
const getSnowingHours = (resort: IResortData) => {
  return resort.forecast.hourlySnow.filter(hour => hour.snow !== 0);
}

/*==============================================================================
  Functional Component
==============================================================================*/
function ResortForecast() {
  const location = useLocation();
  const { resort }: { resort: IResortData } = location.state;

  // Hours where snowfall occurs
  const snowingHours = getSnowingHours(resort);

  // Only display hourly snowfall if it will snow
  const willSnow = snowingHours.length > 0;

  const { temp, height } = useUnitContext() as IUnitContext;
  const tempUnit = temp.unit;
  const setTempUnit = temp.setUnit;
  const heightUnit = height.unit;
  const setHeightUnit = height.setUnit;
  /*============================================================================
    Component JSX
  ============================================================================*/
  return (
    <div className="ResortForecast">
      <div className="transparent-layer">
        <div className="units">
          <TempUnitSelector unit={tempUnit} setUnit={setTempUnit} />
          <HeightUnitSelector
            unit={heightUnit}
            setUnit={setHeightUnit}
          />
        </div>
        <SearchBox />
        <div className="resort-forecast-container">
          <Resort
            resort={resort}
            tempUnit={tempUnit}
            heightUnit={heightUnit}
          />
          {willSnow && (
            <section className="hourly-snowfall">
              <p>Snowfall Per Hour (mm) AEST</p>
              <div className="each-hour-container">
                {snowingHours.map((hour, index) => {
                  return (
                    <div key={index} className="each-hour">
                      <p className="hour">{hour.time}</p>
                      <p className="hour-snowfall">{hour.snow}</p>
                    </div>
                  );                
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResortForecast;