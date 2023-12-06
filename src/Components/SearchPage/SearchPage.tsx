import "./SearchPage.css";
import { CurrentUser, SearchResult } from "types";
import CheckboxSkills from "Components/SearchPage/CheckboxSkills";
import CheckboxLocation from "./CheckboxLocation";
import ResultsContainer from "Components/ResultsContainer/ResultsContainer";
import { useState, useEffect, ChangeEvent } from "react";
import { getSearchResults, getSearchResultsEmpty } from "apiCalls";

interface SearchPageProps {
  currentUser: CurrentUser | undefined;
}

function SearchPage({ currentUser }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]!);

  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(()=> {
    "empty search result response here:"
    getSearchResultsEmpty()
  })

  useEffect(() => {
    console.log("searchQuery is", searchQuery);
  }, [searchQuery]);

  const submitQuery = (event: React.FormEvent) => {
    event.preventDefault();
    getSearchResults(searchQuery).then((data) => {
      console.log("data", data);
      setSearchResults(data.data);
    });
  };
  

  return (
    <div className='search-page'>
      <p className='search-title'>Find people near you</p>
      <div className='search-menu'>
        <CheckboxLocation />
        <CheckboxSkills />
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
      <ResultsContainer searchResults={searchResults} currentUser={currentUser}/>
    </div>
  );
}

export default SearchPage;
