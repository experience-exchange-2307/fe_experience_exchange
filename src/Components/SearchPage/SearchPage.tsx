import "./SearchPage.css";
import { useState, ChangeEvent, useCallback } from "react";
import { getSearchResults } from "apiCalls";
import CheckboxLocation from "./CheckboxLocation";
import ResultsContainer from "Components/ResultsContainer/ResultsContainer";
import { CurrentUser, SearchResult } from "types";


interface SearchPageProps {
  currentUser: CurrentUser | undefined;
}

function SearchPage({ currentUser }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [remoteQuery, setRemoteQuery] = useState<string>("");

  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const compareByDistance = (a: SearchResult, b: SearchResult) => {
    const distanceA = a.attributes.distance;
    const distanceB = b.attributes.distance;
    if (distanceA < distanceB) {
      return -1;
    }
    if (distanceA > distanceB) {
      return 1;
    }
    return 0;
  };
 
  const sortedSearchResults = searchResults.sort(compareByDistance);
  console.log('sortedSearchResults', sortedSearchResults);
  
  const submitQuery = useCallback(() => {
    if (!searchQuery ){
      return
    }
    else if (currentUser) {getSearchResults(searchQuery, currentUser.id)
      .then((data) => {
        console.log("data", data);
        if (data.data) {
          const sortedSearchResults =  data.data.sort(compareByDistance)
          console.log('sortedSearchResults', sortedSearchResults);
          setSearchResults(sortedSearchResults);
        }
      })
     
      .catch((error) => {
        console.log("error", error);
      })}
  }, [searchQuery, currentUser]);

  return (
    <div className='search-page'>
      <p className='search-title'>Find people near you</p>
      <div className='search-menu'>
        <CheckboxLocation setRemoteQuery={setRemoteQuery} />
        <div className='search-bar'>
          <input
            className='search-input'
            type='text'
            placeholder='Search..'
            value={searchQuery}
            onChange={updateQuery}
          />
          <button className='search-submit-btn' onClick={submitQuery}>
            <div className='search-btn-symbol'>⚲</div>
          </button>
        </div>
      </div>
      <ResultsContainer
        searchResults={searchResults}
        currentUser={currentUser}
        remoteQuery={remoteQuery}
        searchQuery={searchQuery}
        setSearchResults={setSearchResults}
      />
    </div>
  );
}

export default SearchPage;

