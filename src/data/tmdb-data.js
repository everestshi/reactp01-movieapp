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

// Function to search movies by query (title)
export const searchMovies = async (query) => {
  const encodedQuery = encodeURIComponent(query);

  const API_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodedQuery}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies by title:', error);
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

// Function to fetch trailer video based on movie id
export const fetchTrailerUrl = async (id) => {
  const API_URL = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=${LANGUAGE}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    //filter and return the youtube id for the first one with type Trailer and published on Youtube
    const youtubeId = data.results.filter((obj) => {
      return obj.type === 'Trailer' && obj.site === 'YouTube';
    })[0].key;
    return 'https://www.youtube.com/embed/' + youtubeId;

    // return data.results;
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    return null;
  }
};
