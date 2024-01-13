import "./BackButton.css";
function BackButton() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button className='back-to-search-btn' onClick={handleGoBack}>
      ← back to search results
    </button>
  );
}

export default BackButton;
