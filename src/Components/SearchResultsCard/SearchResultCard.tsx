import "./SearchResultCard.css";
function SearchResultCard() {
  return (
    <div className='result-card'>
      <div>
        <p className='result-card-name'>Brianna S.</p>
        <p className='result-card-skills'>Skills: knitting, crochet, sewing</p>
      </div>
      <div>
        <p className='result-card-distance'>3.5 miles away</p>
      </div>
    </div>
  );
}

export default SearchResultCard;
