// Kitten

import { Link } from "react-router-dom";
import FavButton from "../components/FavButton";
import { useDispatch } from "react-redux";
import { addFav, deleteFav } from "../features/favs/favsSlice";

const imageFolderPath = "/assets/images/";

function Character({ characterObj, profileLink, isFav }) {
  const dispatch = useDispatch();

  function handleFavClick(addToFav, obj) {
    if (addToFav === true) {
      console.log(obj);
      dispatch(addFav(obj));
    } else {
      dispatch(deleteFav(obj));
    }
  }

  return (
    <div className="character">
      {isFav && (
        <div className="heart">
          <img src={`${imageFolderPath}heart.png`} alt="Heart" />
        </div>
      )}
      <div className="profile-picture">
        <img
          src={`${imageFolderPath}${characterObj.picture}`}
          alt={characterObj.name}
        />
      </div>
      <div className="title-and-name">
        <p>
          <b>Name: </b>
          {characterObj.name}
        </p>
        {!profileLink && (
          <p>
            <b>Quote: </b>
            {characterObj.quote}
          </p>
        )}
      </div>
      {profileLink && (
        <div className="link-profile">
          <Link
            to={{
              pathname: `/character-profile/${characterObj.id}`,
              state: { characterObj },
            }}
          >
            View Profile
          </Link>
        </div>
      )}
      <div className="btn-favourite">
        {isFav ? (
          <FavButton
            characterObj={characterObj}
            remove={true}
            handleFavClick={handleFavClick}
          />
        ) : (
          <FavButton
            characterObj={characterObj}
            handleFavClick={handleFavClick}
          />
        )}
      </div>
    </div>
  );
}

Character.defaultProps = {
  profileLink: true,
};

export default Character;
