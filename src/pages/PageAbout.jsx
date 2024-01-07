// Page About

import { useEffect } from 'react';
import { appTitle } from '../globals/globalVariables';

function PageAbout() {
  useEffect(() => {
    document.title = `${appTitle} - About`;
  }, []);

  return (
    <main>
      <section>
        <h2>Welcome to MVDB!</h2>
        <h3>About the Project</h3>
        <p>
          {' '}
          MVDB is a Movie Database listing the movies based on popularity,
          rating, and release date. Browse for your favourite film, add it to
          the Favourite List, and save it for the Watch Later list!
        </p>
      </section>
    </main>
  );
}

export default PageAbout;
