import "./SearchPage.css";
import { CurrentUser } from "types";
import CheckboxSkills from "Components/SearchPage/CheckboxSkills";
import CheckboxLocation from "./CheckboxLocation";
import ResultsContainer from "Components/ResultsContainer/ResultsContainer";
import { useState, useEffect, ChangeEvent } from "react";

interface SearchPageProps {
  currentUser: CurrentUser | undefined;
}
function SearchPage({ currentUser }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    console.log("searchQuery is", searchQuery);
  }, [searchQuery]);

  return (
    <div className='search-page'>
      <p className='search-title'>Find people near you</p>
      <div className='search-menu'>
        <CheckboxLocation />
        <CheckboxSkills />
        <div className='search-bar'>
          <input
            className="search-input"
            type='text'
            placeholder='Search..'
            value={searchQuery}
            onChange={updateQuery}
          />
          <button className='search-submit-btn'>
            <div className='search-btn-symbol'>⚲</div>
          </button>
        </div>
      </div>
      <ResultsContainer/>
    </div>
  );
}

export default SearchPage;
