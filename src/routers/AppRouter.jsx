// App Router

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHome from '../pages/PageHome';
import PageMovieDetails from '../pages/PageMovieDetails';
import PageAbout from '../pages/PageAbout';
import PageFavs from '../pages/PageFavs';
import PageWatchlist from '../pages/PageWatchlist';
import PageNotFound from '../pages/PageNotFound';
import PageSearch from '../pages/PageSearch';
import { appTitle, appAuthor } from '../globals/globalVariables';

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        {/* <Header title={appTitle} /> */}
        <Nav />
        <Routes>
          <Route path="/" exact element={<PageHome />} />
          <Route path="/movie-details/:id" element={<PageMovieDetails />} />
          <Route path="/about" element={<PageAbout />} />
          <Route path="/favs" element={<PageFavs />} />
          <Route path="/watchlist" element={<PageWatchlist />} />
          <Route path="/search" element={<PageSearch />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer author={appAuthor} />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
