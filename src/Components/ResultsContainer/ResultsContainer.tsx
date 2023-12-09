import React, { useEffect, Dispatch, SetStateAction} from "react";
import "./ResultsContainer.css";
import SearchResultCard from "Components/SearchResultsCard/SearchResultCard";
import { SearchResult, CurrentUser } from "types";

interface ResultsContainerProps {
  searchResults: SearchResult[] | [];
  currentUser: CurrentUser | undefined;
  remoteQuery: string;
  searchQuery:string;
  setSearchResults: Dispatch<SetStateAction<SearchResult[]>>;
}


function ResultsContainer({
  searchResults,
  currentUser,
  remoteQuery,
  searchQuery,
  // setSearchResults
}: ResultsContainerProps) {
  useEffect(() => {
    console.log("ResultsContainer rendering with", searchResults);
  }, [searchResults]);

  const renderResults = () => {
    let filteredResults = searchResults;

    if (remoteQuery) {
      filteredResults = searchResults.filter(result => result.attributes.is_remote === true);
      console.log('filtered results', filteredResults)
      // setSearchResults(filteredResults)
    }
  
    if (!searchResults || searchResults.length === 0) {
      return <p>Please enter a skill to search for.</p>;
    } else {
      return filteredResults.map((result, index) => (
        <SearchResultCard
          key={index}
          distance={result.attributes.distance}
          first_name={result.attributes.first_name}
          last_name={result.attributes.last_name}
          is_remote={result.attributes.is_remote}
          id={result.id}
          skills={result.attributes.skills}
        />
      ));
    }
  };

  return (
    <div>
      {searchResults.length === 0 ? (
        <>
          <h1>No results found</h1>
          <div className='results-container'>Try a different search</div>
        </>
      ) : (
        <>
          <h1 className='search-results-qty'>Showing {searchResults.length} Results for {searchQuery}</h1>
          <div className='results-container'>{renderResults()}</div>
        </>
      )}
    </div>
  );
}

export default ResultsContainer;
