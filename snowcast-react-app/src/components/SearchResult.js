import { Link } from 'react-router-dom';

function SearchResult(props) {
  const { resortName, country, currentTemp, hourlySnowFall, iconCode, snowFall } = props.result;
  const resortObj = { resortName, country, currentTemp, hourlySnowFall, iconCode }
  resortObj.snowFallToday = snowFall;
  console.log('resortObj')
  console.log(resortObj)

  return (
    <div className="SearchResult">
      <Link
        to="/resort_forecast"
        state={{ clickedResort: resortObj }}
      >{resortName}</Link>
    </div>
  );
}

export default SearchResult;