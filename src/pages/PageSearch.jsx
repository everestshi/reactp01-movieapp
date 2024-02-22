import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../data/tmdb-data";
import MovieThumbnail from "../components/MovieThumbnail";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query != searchQuery) {
      setSearchQuery(query);
    }
  });

  useEffect(() => {
    // Define a function to fetch search results
    const fetchSearchResults = async () => {
      try {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    };

    // Call fetchSearchResults whenever searchQuery changes
    fetchSearchResults();
  }, [searchQuery]); // Execute the effect whenever searchQuery changes

  return (
    <main>
      <div className="search-page">
        <div className="title-bottom-border"></div>
        {searchResults.length < 1 ? (
          <div className="border-container">
            <img
              className="popcorn-img"
              src="../../public/assets/images/CuteDetective.png"
              alt="Cute Detective"
            />
            <div className="empty-description">
              <p>Looks like you haven't added a search term yet!</p>
              <p>Start typing in the search bar to begin your search.</p>
            </div>
          </div>
        ) : (
          <div className="movies-grid">
            {searchResults.map((movie) => (
              <MovieThumbnail key={movie.id} movieObj={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
