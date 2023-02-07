import Resort from './Resort';

function PopularResorts({ snowFallData }) {
  // getLatLon(popularResorts[0])
  //   .then(({lat, lon}) => getResortSnowFall(lat, lon))
  //   .then(newSnowFallData => updateSnowFallData(newSnowFallData));

  return (
    <div className="PopularResorts">
      {snowFallData.map((forecast, index) => 
        <Resort
          key={index} 
          resortName={forecast.resortName}
          country={forecast.country}
          snowFallToday={forecast.snowFall}
          currentTemp={forecast.currentTemp}
        />
      )}
    </div>
  );
}

export default PopularResorts;