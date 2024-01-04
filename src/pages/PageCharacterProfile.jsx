// Page Character Profile

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Character from "../components/Character";
import characterList from "../data/character-list";
import { appTitle } from "../globals/globalVariables";
import isFav from "../utilities/isFav";
import { useSelector } from "react-redux";

function PageCharacterProfile() {
  const favs = useSelector((state) => state.favs.items);
  const { id } = useParams();
  // Next line uses "==" instead of "===" because the URL parameter
  // comes back as a string and we just want to test for value and
  // not value and data type...
  // Using a "==" operator means that
  // "1" == 1 returns true...
  // [someArray].find() returns the first matched item if a matched
  // item is found, otherwise it returns undefined...
  const characterObj = characterList.find(
    (character) => String(character.id) === id
  );

  useEffect(() => {
    if (!characterObj) {
      document.title = `${appTitle} - Character Profile`;
    } else {
      document.title = `${appTitle} - Character Profile: ${characterObj.name}`;
    }
  }, [characterObj]);

  return (
    <main>
      <section>
        <h2>Character Profile</h2>
        {!characterObj ? (
          <p>
            Character not found. <Link to="/">Return to home page</Link>.
          </p>
        ) : (
          <div className="character-single">
            <Character
              characterObj={characterObj}
              profileLink={false}
              isFav={isFav(favs, null, characterObj.id)}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default PageCharacterProfile;
