import React from "react";
import { useState, useEffect, useCallback} from "react";
import { getSearchResults } from "apiCalls";
import { useParams, useNavigate } from "react-router-dom";
import CheckboxLocation from "./CheckboxLocation";
import ResultsContainer from "Components/ResultsContainer/ResultsContainer";
import { CurrentUser, SearchResult, UserSkill } from "types";
import Autosuggest, {
  ChangeEvent as AutosuggestChangeEvent,
  SuggestionsFetchRequested,
} from "react-autosuggest";
import "../AutosuggestDropdown/AutosuggestDropdown.css";
import { InputProps } from "react-autosuggest";
import Loading from "Components/Loading/Loading";

interface SearchPageProps {
  currentUser: CurrentUser | null;
}

interface RenderSuggestionParams {
  query: string;
  isHighlighted: boolean;
}

function renderSuggestion(
  suggestion: string,
  { isHighlighted }: RenderSuggestionParams
): JSX.Element {
  return (
    <span style={{ fontWeight: isHighlighted ? "bold" : "normal" }}>
      {suggestion}
    </span>
  );
}

function SearchPage({ currentUser }: SearchPageProps) {
  const skills: string[] = [
    "knitting",
    "piano",
    "juggling",
    "birdwatching",
    "crochet",
    "sewing",
  ];

  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [remoteQuery, setRemoteQuery] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>(skills);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const navigate = useNavigate();

  function escapeRegexCharacters(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function getSuggestions(value: string): string[] {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");
    return skills.filter((skill) => regex.test(skill));
  }

  function getSuggestionValue(suggestion: string) {
    return suggestion;
  }

  function shouldRenderSuggestions(): boolean {
    return true;
  }

  const inputProps: InputProps<string> = {
    placeholder: "Click for suggestions",
    value,
    onChange: (event, { newValue }: AutosuggestChangeEvent) => {
      setValue(newValue);
      setSearchQuery(newValue);
      console.log("new value is ", newValue);
    },
  };

  const onSuggestionsFetchRequested: SuggestionsFetchRequested = ({
    value,
    reason,
  }) => {
    if (reason === "input-changed") {
      setSuggestions(getSuggestions(searchQuery));
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // const updateQuery = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(event.target.value);
  //   setValue(event.target.value);
  // };

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
      const queryValue = searchQuery || queryToSubmit;
      console.log(`queryValue is ${queryValue}`);
      if (!queryValue) {
        return;
      } else if (currentUser) {
        setIsLoading(true);
        setNoResults(false);
        getSearchResults(queryValue, currentUser.id)
          .then((data) => {
            if (data.data) {
              const filteredResults = data.data
                .filter((result: SearchResult) => {
                  const resultNumberId = parseInt(result.id, 10);
                  return resultNumberId !== currentUser.id;
                })
                .map((searchResult: SearchResult) => {
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
                });

              const sortedSearchResults =
                filteredResults.sort(compareByDistance);
              setSearchResults(sortedSearchResults);
              navigate(`/search/${queryValue}`);
              if (sortedSearchResults.length === 0) {
                setNoResults(true);
              }
            }
          })
          .catch((error) => {
            console.log("error", error);
          })
          .finally(() => {
            setIsLoading(false);
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

  
  useEffect(() => {
    onSuggestionsFetchRequested({ value, reason: "input-changed" });
    // eslint-disable-next-line 
  }, [value]);

  const handleButtonClick = () => {
    submitQuery(searchQuery);
  };
  return (
    <div className='search-page'>
      <p className='search-title'>Find people near you</p>
      <div className='search-menu'>
        <CheckboxLocation setRemoteQuery={setRemoteQuery} />
        <div className='search-bar'>
          <Autosuggest
            
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            shouldRenderSuggestions={shouldRenderSuggestions}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <button className='search-submit-btn' onClick={handleButtonClick}>
            <div className='search-btn-symbol'>⚲</div>
          </button>
        </div>
      </div>
      {isLoading && <Loading />}
      {noResults ? (
        <h3>No Results for your search. Try searching for something else.</h3>
      ) : (
        <ResultsContainer
          searchResults={searchResults}
          remoteQuery={remoteQuery}
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
}

export default SearchPage;
