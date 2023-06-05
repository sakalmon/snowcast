import { Link } from 'react-router-dom';

function SearchResult(props) {
  const { resortName, country, currentTemp, hourlySnowFall, eightDaySnowFall, iconCode, snowFall, flag } = props.result;
  const resortObj = { resortName, country, currentTemp, hourlySnowFall, eightDaySnowFall, iconCode, flag }
  resortObj.snowFallToday = snowFall;

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