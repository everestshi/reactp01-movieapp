// Page About

import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

function PageAbout() {
  useEffect(() => {
    document.title = `${appTitle} - About`;
  }, []);

  return (
    <main>
      <section>
        <h2>Welcome to MVDB!</h2>
        <div className="about-container">
        <div className="about-container-section left">
          <h4 className="about-title">About the Project</h4>
          <p>
            {" "}
            MVDB is a Movie Database listing the movies based on popularity,
            rating, and release date. Browse for your favourite film, add it to
            the Favourite List, and save it for the Watch Later list!
          </p>
          <p>
            This product uses the TMDb API but is not endorsed or certified by
            TMDb.
          </p>
          <img
            src="../../public/assets/images/API_logo.png"
            alt="API Logo"
            className="db-logo"
          />

        </div>
        <div className="about-container-section right">
          <h4 className="about-title">Meet the team</h4>
          <p>
            MVDB is a React JS project developed and created by Alex, Amanda, and Everest. We are an enthusiastic web development team that strives
            to go above and beyond what is expected from us!
          </p>
        </div>
        </div>
      </section>
    </main>
  );
}

export default PageAbout;
