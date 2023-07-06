import Resort from '../components/Resort';
import Search from '../components/Search';
import { useLocation } from 'react-router-dom';
import '../assets/stylesheets/ResortForecast.scss';
import { IResortForecast, IResortData } from '../types';

function ResortForecast() {
  const location = useLocation();
  const { resort }: { resort: IResortData } = location.state;

  const hourlySnow = (resort.forecast as IResortForecast).hourlySnow;
  const snowingHours = hourlySnow.filter(hourSnow => hourSnow.snow !== 0);

  return (
    <div className="ResortForecast">
      <Search />
      <div className="resort-forecast-container">
        <Resort resort={resort} />

        {/* Only display hourly snowfall if it snowed at least once */}
        {snowingHours.length > 0 && (
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