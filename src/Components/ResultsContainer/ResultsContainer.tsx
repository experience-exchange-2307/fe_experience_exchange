import React, { useEffect } from "react";
import "./ResultsContainer.css";
import SearchResultCard from "Components/SearchResultsCard/SearchResultCard";
import { SearchResult, CurrentUser } from "types";

interface ResultsContainerProps {
  searchResults: SearchResult[] | [];
  currentUser: CurrentUser | undefined;
}

function ResultsContainer({ searchResults }: ResultsContainerProps) {
  useEffect(() => {
    console.log("ResultsContainer rendering with", searchResults);
  }, [searchResults]);

  const renderResults = () => {
    if (searchResults.length === 0) {
      return <p>default result card element</p>;
    } else {
      return searchResults.map((result) => (
        <SearchResultCard
          key={result.id}
          first_name={result.attributes.first_name}
          last_name={result.attributes.last_name}
          is_remote={result.attributes.is_remote}
          id={result.id}
          skills={result.attributes.skills}
        />
      ));
    }
  };

  const resultCards = renderResults();

  return (
    <>
      {searchResults.length > 0 ? (
        <div className='results-container'>{resultCards}</div>
      ) : (
        <p>no results</p>
      )}
    </>
  );
}

export default ResultsContainer;


