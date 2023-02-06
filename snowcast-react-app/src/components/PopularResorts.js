import Resort from './Resort';

function PopularResorts({ popularResorts, getLatLon, getResortSnowFall, updateSnowFallData }) {
  // getLatLon(popularResorts[0])
  //   .then(({lat, lon}) => getResortSnowFall(lat, lon))
  //   .then(newSnowFallData => updateSnowFallData(newSnowFallData));

  return (
    <div className="PopularResorts">
      <Resort />
    </div>
  );
}

export default PopularResorts;