// Page Not Found

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appTitle } from '../globals/globalVariables';

function PageNotFound(){

	useEffect(() => {
		document.title = `${appTitle} - Page Not Found`;
	}, []);

	return (
		<main>
			<section>
				<h2>404 ... : (</h2>
				<p>Page not found.</p>
				<p>Go to <Link to="/">Home</Link> page.</p>
			</section>
		</main>
	);
}

export default PageNotFound;