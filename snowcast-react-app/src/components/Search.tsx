import { useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import '../assets/stylesheets/Search.scss';
import '../assets/stylesheets/SearchResult.scss';
import { SearchObj } from '../SearchObj';
import type { IResortData } from '../types';

/*==============================================================================
  Function Definitions
==============================================================================*/
const getSearchResults = async (query: string): Promise<IResortData[]> => {
  const searchObj = new SearchObj(query);
  return searchObj.getResults();
}

/*==============================================================================
  Event Handlers
==============================================================================*/
const handleContentChange = (
  event: React.FormEvent<HTMLInputElement>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  ) => setSearchQuery((event.target as HTMLInputElement).value);

const handleInputClick = (
  event: React.MouseEvent<HTMLInputElement>,
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setSearchColor: React.Dispatch<React.SetStateAction<'grey' | 'black'>>
  ) => {
  if (searchQuery === 'Search Ski Resorts') {
    setSearchQuery('');
  }
  setSearchColor('black');
}

const handleInputBlur = (
  event: React.FocusEvent<HTMLInputElement>,
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  ) => {
  if (searchQuery === '') {
    setSearchQuery('Search Ski Resorts');
  }
}

const handleSearch = (
  event: React.FormEvent<HTMLFormElement>,
  searchQuery: string,
  setSearchResults: React.Dispatch<React.SetStateAction<IResortData[]>>
  ) => {
  event.preventDefault();
  getSearchResults(searchQuery)
    .then(searchResults => setSearchResults(searchResults));
};

/*==============================================================================
  Functional Component
==============================================================================*/
function Search() {
  /*============================================================================
    State Hooks
  ============================================================================*/
  const [ searchQuery, setSearchQuery ] = useState('Search Ski Resorts');
  const [ searchResults, setSearchResults ] = useState<IResortData[]>([]);
  const [ showResults, setShowResults ] = useState(true);
  const [ searchColor, setSearchColor ] = useState<'grey' | 'black'>('grey');

  /*============================================================================
    Component JSX
  ============================================================================*/
  return (
    <div className="Search">
      <div className="search-container">
        <div className="search-box">
          <form onSubmit={event => handleSearch(
            event,
            searchQuery,
            setSearchResults
          )}>
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            <input
              type="text"
              onChange={event => handleContentChange(event, setSearchQuery)}
              value={searchQuery}
              onClick={event => handleInputClick(
                event,
                searchQuery,
                setSearchQuery,
                setSearchColor
              )}
              onBlur={event => handleInputBlur(
                event,
                searchQuery,
                setSearchQuery
              )} 
              style={{ color: searchColor }}
            />
            <button>Search</button>
            <div></div>
          </form>
        </div>
        <div className="search-results">
          {showResults && searchResults.map((resort, index: number) => {
            return <SearchResult key={index} resort={resort} />
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;