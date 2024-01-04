// Page Contact

import { useEffect } from "react";
import { appTitle } from "../globals/globalVariables";

function PageContact() {
  useEffect(() => {
    document.title = `${appTitle} - Contact`;
  }, []);

  return (
    <main>
      <section>
        <h2>Contact Me</h2>
        <p>Email me at: </p>
        <ul>
          <li>
            <a href="mailTo:jsolomon11@bcit.ca">jsolomon11@bcit.ca</a>
          </li>
          <li>
            <a href="mailTo:josh@solomoncraft.com">josh@solomoncraft.com</a>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default PageContact;
