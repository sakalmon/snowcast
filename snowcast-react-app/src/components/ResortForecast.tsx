import Resort from '../components/Resort';
import SearchBox from './SearchBox';
import { useLocation } from 'react-router-dom';
import '../assets/stylesheets/ResortForecast.scss';
import { IResortData } from '../types/allTypes';

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
  const snowingHours = getSnowingHours(resort)

  // Only display hourly snowfall if it will snow
  const willSnow = snowingHours.length > 0;

  /*============================================================================
    Component JSX
  ============================================================================*/
  return (
    <div className="ResortForecast">
      <SearchBox />
      <div className="resort-forecast-container">
        <Resort resort={resort} />
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
  );
}

export default ResortForecast;