import { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieThumbnail from "../components/MovieThumbnail";
import { appTitle } from "../globals/globalVariables";
import { useSelector } from "react-redux";

function PageFavs() {
  const favs = useSelector((state) => state.favs.items);

  useEffect(() => {
    document.title = `${appTitle} - Favourite Movies`;
  }, []);

  return (
    <main>
      <section>
        <h2>Favourite Movies</h2>
        <div className="title-bottom-border"></div>
        {favs.length < 1 ? (
          <div className="border-container">
            <img
              className="popcorn-img"
              src="/assets/images/CutePopcorn2.png"
              alt="Cute Popcorn"
            />
            <div className="empty-description">
              <p>You don't have any Favourites yet.</p>
              <p>Let's add some!</p>
            </div>
            <p>
              Return to the <Link to="/">home</Link> page to add your favourite
              movies.
            </p>
          </div>
        ) : (
          <div className="movies-grid">
            {favs.map((movieObj) => {
              return <MovieThumbnail key={movieObj.id} movieObj={movieObj} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default PageFavs;
