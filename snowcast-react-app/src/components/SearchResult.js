import { Link } from 'react-router-dom';

function SearchResult(props) {
  const { resortName, country } = props.result;
  const resortObj = props.result;

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