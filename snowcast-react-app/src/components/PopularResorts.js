import Resort from './Resort';

function PopularResorts({ popularResorts, snowFallData }) {
  // getLatLon(popularResorts[0])
  //   .then(({lat, lon}) => getResortSnowFall(lat, lon))
  //   .then(newSnowFallData => updateSnowFallData(newSnowFallData));

  return (
    <div className="PopularResorts">
      <Resort 
        popularResorts={popularResorts}
        snowFallData={snowFallData}
      />
    </div>
  );
}

export default PopularResorts;