function Resort(props) {
  const { resortName, country, snowFallToday, currentTemp, handleClick, iconCode } = props;

  const iconLink = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="Resort" onClick={() => handleClick(props)}>
      <section className="forecast-details">
        <p className="name">{resortName}</p>
        <p className="country">{country}</p>
        <p className="snowfall-today">Snowfall (next 24h): {snowFallToday}mm</p>
        <p className="current-temp">Current Temperature: {currentTemp} &deg;C</p>
      </section>
      <section className="weather-icon">
        <img src={iconLink} alt="" />
      </section>
    </div>
  );
}

export default Resort;