import React, { useEffect, useState} from "react";
import "./ResultsContainer.css";
import SearchResultCard from "Components/SearchResultsCard/SearchResultCard";
import { SearchResult} from "types";

interface ResultsContainerProps {
  searchResults: SearchResult[] | [];
  remoteQuery: boolean;
  searchQuery: string;
}

function ResultsContainer({
  searchResults,
  remoteQuery,
  searchQuery,
}: ResultsContainerProps) {  const [remoteResults, setRemoteResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (remoteQuery) {
      const filteredResults = searchResults.filter(
        (result) => result.attributes.is_remote === true
      );
      setRemoteResults(filteredResults);
    } else {
      setRemoteResults(searchResults);
    }
  }, [searchResults, remoteQuery]);

  const renderResults = () => {
    if (!searchResults || searchResults.length === 0) {
      return <p>Please enter a skill to search for.</p>;
    } else {
      const resultsToRender = remoteQuery ? remoteResults : searchResults;

      return resultsToRender.map((result, index) => (
        <SearchResultCard
          key={index}
          distance={result.attributes.distance}
          first_name={result.attributes.first_name}
          last_name={result.attributes.last_name}
          is_remote={result.attributes.is_remote}
          id={result.id}
          skills={result.attributes.skills}
          searchQuery={searchQuery}
        />
      ));
    }
  };

  return (
    <div>
      { searchResults.length === 0 ? (
        <>
          <div className="results-container"></div>
          {/* <Loading />  */}
        </>
      ) : (
        <>
          <h1 className="search-results-qty">
            Showing {remoteQuery ? remoteResults.length : searchResults.length}{" "}
            Results for {searchQuery}
          </h1>
          <div className="results-container">{renderResults()}</div>
        </>
      )}
    </div>
  );
}

export default ResultsContainer;