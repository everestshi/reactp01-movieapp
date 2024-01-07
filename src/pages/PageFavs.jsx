// Page Favs
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
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
        {favs.length < 1 ? (
          <p>
            No favourite characters. Return to the <Link to="/">home</Link> page
            to add some favourite characters.
          </p>
        ) : (
          <div className="characters-grid">
            {favs.map((singleCharacter, i) => {
              return (
                <Movie
                  key={i}
                  movieObj={singleCharacter}
                  isFav={true}
                  profileLink = "lfkjg"
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default PageFavs;
