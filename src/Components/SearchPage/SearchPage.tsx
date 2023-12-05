import "./SearchPage.css";
import { useState, useEffect, ChangeEvent } from "react";
import { getSearchResults } from "apiCalls";
import CheckboxSkills from "./CheckboxSkills";
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

  useEffect(() => {
    console.log("searchQuery is", searchQuery);
    submitQuery();
  }, [searchQuery, remoteQuery]);

  const submitQuery = () => {
    getSearchResults(searchQuery, remoteQuery).then((data) => {
      console.log("data", data);
      setSearchResults(data.data);
    });
  };

  return (
    <div className='search-page'>
      <p className='search-title'>Find people near you</p>
      <div className='search-menu'>
        <CheckboxLocation setRemoteQuery={setRemoteQuery} />
        <CheckboxSkills searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
      <ResultsContainer searchResults={searchResults} currentUser={currentUser} />
    </div>
  );
}

export default SearchPage;
