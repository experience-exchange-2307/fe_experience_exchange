import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { getSearchResults } from "apiCalls";
import { useParams, useNavigate } from "react-router-dom";
import CheckboxLocation from "./CheckboxLocation";
import ResultsContainer from "Components/ResultsContainer/ResultsContainer";
import { CurrentUser, SearchResult, UserSkill } from "types";

interface SearchPageProps {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
}

function SearchPage({ currentUser }: SearchPageProps) {
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [remoteQuery, setRemoteQuery] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState(true); 
  const navigate = useNavigate();

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

  const submitQuery = useCallback(
    (queryToSubmit?: string) => {
      const queryValue = queryToSubmit || searchQuery;
      if (!queryValue) {
        return;
      } else if (currentUser) {
        getSearchResults(queryValue, currentUser.id)
          .then((data) => {
            if (data.data) {
              console.log(data.data, "data.data");
              const uniqueSearchResults = data.data.map(
                (searchResult: SearchResult) => {
                  const uniqueSkills: UserSkill[] = [];
                  const skillNamesSet = new Set<string>();
                  for (const skill of searchResult.attributes.skills) {
                    const lowercaseSkillName = skill.name.toLowerCase();
                    if (!skillNamesSet.has(lowercaseSkillName)) {
                      skillNamesSet.add(lowercaseSkillName);
                      uniqueSkills.push(skill);
                    }
                  }
                  return {
                    ...searchResult,
                    attributes: {
                      ...searchResult.attributes,
                      skills: uniqueSkills,
                    },
                  };
                }
              );
              const sortedSearchResults = uniqueSearchResults.sort(
                compareByDistance
              );
              setSearchResults(sortedSearchResults);
              navigate(`/search/${queryValue}`);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
    [searchQuery, currentUser, navigate]
  );

  useEffect(() => {
    setSearchQuery(query || "");
  }, [query]);

  useEffect(() => {
    if (initialLoad) {
      submitQuery(query || "");
      setInitialLoad(false);
    }
  }, [initialLoad, query, submitQuery]);

  return (
    <div className="search-page">
      <p className="search-title">Find people near you</p>
      <div className="search-menu">
        <CheckboxLocation setRemoteQuery={setRemoteQuery} />
        <div className="search-bar">
          <input
            name="search"
            className="search-input"
            type="text"
            placeholder="Search.."
            value={searchQuery}
            onChange={updateQuery}
          />
          <button
            className="search-submit-btn"
            onClick={() => submitQuery(searchQuery)}
          >
            <div className="search-btn-symbol">⚲</div>
          </button>
        </div>
      </div>
      <ResultsContainer
        searchResults={searchResults}
        remoteQuery={remoteQuery}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default SearchPage;