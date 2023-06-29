import { Link } from 'react-router-dom';
import type { ISearchResultProps, IResortObjProps } from '../types';

function SearchResult(props: { result: ISearchResultProps }) {
  const searchResult: ISearchResultProps | IResortObjProps = Object.assign({snowFallToday: props.result.snowFall}, props.result);

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