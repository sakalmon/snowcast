import Resort from '../components/Resort';
import { useLocation } from 'react-router-dom';
import '../assets/stylesheets/ResortForecast.scss';

function ResortForecast() {
  const location = useLocation();
  const { clickedResort } = location.state;
  const { resortName, country, snowFallToday, currentTemp, iconCode, hourlySnowFall } = clickedResort;
  
  return (
    <div className="ResortForecast">
        <Resort
          resortName={resortName}
          country={country}
          snowFallToday={snowFallToday}
          currentTemp={currentTemp}
          iconCode={iconCode}
        />
        <section className="hourly-snowfall">
          <p>Snowfall Per Hour (mm)</p>
          <div className="each-hour-container">
            {hourlySnowFall.map((hourSnowFall, index) => {
              return (
                <div key={index} className="each-hour">
                  <p className="hour">{index}</p>
                  <p className="hour-snowfall">{hourSnowFall}</p>
                </div>
              );
            })}
          </div>
        </section>
    </div>
  );
}

export default ResortForecast;