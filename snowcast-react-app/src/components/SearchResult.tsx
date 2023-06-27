import { Link } from 'react-router-dom';
import type { SearchResultProps, ResortObjProps } from '../types';

function SearchResult(props: { result: SearchResultProps }) {
  const searchResult: ResortObjProps = Object.assign({snowFallToday: props.result.snowFall}, props.result);

  return (
    <div className="SearchResult">
      <Link
        to="/resort_forecast"
        state={{ clickedResort: searchResult }}
      >{props.result.resortName}</Link>
    </div>
  );
}

export default SearchResult;