import { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieThumbnail from "../components/MovieThumbnail";
import { appTitle } from "../globals/globalVariables";
import { useSelector } from "react-redux";

function PageWatchlist() {
  const watchlistItems = useSelector((state) => state.watchlist.items);

  useEffect(() => {
    document.title = `${appTitle} - Watchlist`;
  }, []);

  return (
    <main>
      <section>
        <h2>Watchlist</h2>
        <div className="title-bottom-border"></div>
        {watchlistItems.length < 1 ? (
          <div className="border-container">
            <img
              className="popcorn-img"
              src="/assets/images/CuteCat.png"
              alt="Cute Popcorn"
            />
            <div className="empty-description">
              <p>Your Watchlist needs some love.</p>
              <p>Let's fill it up with awesome movies.</p>
            </div>
            <p>
              Head back to the <Link to="/">home</Link> page to start adding to
              your watchlist.
            </p>
          </div>
        ) : (
          <div className="movies-grid">
            {watchlistItems.map((movieObj) => {
              return <MovieThumbnail key={movieObj.id} movieObj={movieObj} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default PageWatchlist;
