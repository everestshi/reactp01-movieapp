const API_KEY = 'be601e74c575148d8ea2224d8cded829';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'en-US';

// Function to fetch popular movies
export const fetchPopularMovies = async () => {
    const API_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  };
  
  // Function to fetch top-rated movies
  export const fetchTopRatedMovies = async () => {
    const API_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching top-rated movies:', error);
      return [];
    }
  };
  
  // Function to fetch now playing movies
  export const fetchNowPlayingMovies = async () => {
    const API_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      return [];
    }
  };
  
  // Function to fetch upcoming movies
  export const fetchUpcomingMovies = async () => {
    const API_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      return [];
    }
  };
  
  // Function to search movies by query
  export const searchMovies = async (query, year) => {
    const encodedQuery = encodeURIComponent(query);
    const encodedYear = encodeURIComponent(year);
  
    const API_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&primary_release_year=${encodedYear}&query=${encodedQuery}`;
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching movies by year:', error);
      return [];
    }
  };
  
  // Function to fetch movie genres
  export const fetchMovieGenres = async () => {
    const API_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error('Error fetching movie genres:', error);
      return [];
    }
  };
    