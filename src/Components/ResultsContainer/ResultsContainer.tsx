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
    if (!searchResults || searchResults.length === 0) {
      return <p>Please enter a skill to search for.</p>;
    } else {
      return searchResults.map((result, index) => (
        <SearchResultCard
          key={index}
          first_name={result.attributes.first_name}
          last_name={result.attributes.last_name}
          is_remote={result.attributes.is_remote}
          id={result.id}
          skills={result.attributes.skills}
        />
      ));
    }
  };

  return (<div>
    {!searchResults || searchResults.length === 0 ? (
      <p></p>
    ) : (<h1>Showing {searchResults.length} Results</h1>)

    }
    <div className='results-container'>{renderResults()}</div>;
    </div>)
}

export default ResultsContainer;

