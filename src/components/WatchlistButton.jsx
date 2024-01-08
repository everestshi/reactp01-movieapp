// Fav Button

function WatchlistButton({ characterObj, remove, handleWatchlistClick }) {
  function handleAddWatchlist() {
    handleWatchlistClick(true, characterObj);
  }

  function handleRemoveWatchlist() {
    handleWatchlistClick(false, characterObj);
  }

  return (
    <>
      {remove === false ? (
        <button onClick={handleAddWatchlist}>Add To Watchlist</button>
      ) : (
        <button onClick={handleRemoveWatchlist}>Remove From Watchlist</button>
      )}
    </>
  );
}

WatchlistButton.defaultProps = {
  remove: false,
};

export default WatchlistButton;
