// Fav Button

function FavButton({ characterObj, remove, handleFavClick }) {
  function handleAddFav() {
    handleFavClick(true, characterObj);
  }

  function handleRemoveFav() {
    handleFavClick(false, characterObj);
  }

  return (
    <>
      {remove === false ? (
        <button onClick={handleAddFav}>Add To Favourites</button>
      ) : (
        <button onClick={handleRemoveFav}>Remove From Favourites</button>
      )}
    </>
  );
}

FavButton.defaultProps = {
  remove: false,
};

export default FavButton;
