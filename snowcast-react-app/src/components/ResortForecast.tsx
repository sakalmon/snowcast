import Resort from '../components/Resort';
import Search from '../components/Search';
import { useLocation } from 'react-router-dom';
import '../assets/stylesheets/ResortForecast.scss';
import { IResortForecast, IResortData } from '../types';

function ResortForecast() {
  const location = useLocation();
  const { resort }: { resort: IResortData } = location.state;

  // if (Object.keys(resort.forecast)) {
  //   hourlySnow = resort.forecast.hourlySnow;
  // }
  // const snowingHours = hourlySnow.filter(hourSnow => hourSnow.snow !== 0);

  const snowingHours = resort.forecast.hourlySnow.filter(hour => {
    return hour.snow !== 0;
  });

  /* Only display hourly snowfall if it will snow */
  let willSnow = snowingHours.length > 0;

  return (
    <div className="ResortForecast">
      <Search />
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