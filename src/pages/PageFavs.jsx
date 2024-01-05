// Page Favs
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Character from "../components/Character";
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
        <h2>Favourite Characters</h2>
        {favs.length < 1 ? (
          <p>
            No favourite characters. Return to the <Link to="/">home</Link> page
            to add some favourite characters.
          </p>
        ) : (
          <div className="characters-grid">
            {favs.map((singleCharacter, i) => {
              return (
                <Character
                  key={i}
                  characterObj={singleCharacter}
                  isFav={true}
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
