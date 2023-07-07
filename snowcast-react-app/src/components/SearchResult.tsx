import { Link } from 'react-router-dom';
import type { IResortData } from '../types';

function SearchResult({ resort }: { resort: IResortData }) {
  return (
    <div className="SearchResult">
      <Link to="/resort_forecast" state={{ resort }}>
        {resort.name}
      </Link>
    </div>
  );
}

export default SearchResult;