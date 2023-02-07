function Resort({ popularResorts, snowFallData }) {
  return (
    <div className="Resort">
        <p className="name">{popularResorts[0]}</p>
        <p className="country">Canada</p>
        <p className="snowfall-today">{snowFallData?.snowFall}</p>
        <p className="current-temp">{snowFallData?.currentTemp} &deg;C</p>
    </div>
  );
}

export default Resort;