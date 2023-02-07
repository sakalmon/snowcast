function Resort({ resortName, country, snowFallToday, currentTemp }) {
  return (
    <div className="Resort">
        <p className="name">{resortName}</p>
        <p className="country">{country}</p>
        <p className="snowfall-today">Snowfall (next 24h): {snowFallToday}mm</p>
        <p className="current-temp">Current Temperature: {currentTemp} &deg;C</p>
    </div>
  );
}

export default Resort;