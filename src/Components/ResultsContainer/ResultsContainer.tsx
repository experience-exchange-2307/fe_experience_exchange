import React from 'react'
import './ResultsContainer.css'
import SearchResultCard from 'Components/SearchResultsCard/SearchResultCard'
function ResultsContainer() {

  return (
    <div className='results-container'>
      <p>results container</p>
      <SearchResultCard/>
      <SearchResultCard/>
      <SearchResultCard/>
      <SearchResultCard/>
      <SearchResultCard/>
    </div>
  )
}

export default ResultsContainer
