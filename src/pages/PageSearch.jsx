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
    <div className="search-page">
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
        />
      </div>
      <div className="search-results">
        {searchResults.map((movie) => (
          <MovieThumbnail key={movie.id} movieObj={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
