import Resort from '../components/Resort';

function ResortForecast({ resortClicked }) {
  const { resortName, country, snowFallToday, currentTemp, iconCode, hourlySnowFall } = resortClicked;
  
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
                  <p>{index}</p>
                  <p>{hourSnowFall}</p>
                </div>
              );
            })}
          </div>
        </section>
    </div>
  );
}

export default ResortForecast;