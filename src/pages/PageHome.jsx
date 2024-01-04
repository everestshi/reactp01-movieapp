// Page Home

import { useEffect } from "react";
import Character from "../components/Character";
import { appTitle } from "../globals/globalVariables";
import characterList from "../data/character-list";
import isFav from "../utilities/isFav";
import { useSelector } from "react-redux";

function PageHome() {
  const favs = useSelector((state) => state.favs.items);

  useEffect(() => {
    document.title = `${appTitle} - Home`;
  }, []);

  return (
    <main>
      <section>
        <h2>Top Characters</h2>
        <div className="characters-grid">
          {characterList.map((singleCharacter, i) => {
            return (
              <Character
                key={i}
                characterObj={singleCharacter}
                isFav={isFav(favs, null, singleCharacter.id)}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default PageHome;
