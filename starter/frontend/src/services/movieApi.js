import axios from 'axios';

const baseUrl = (process.env.REACT_APP_MOVIE_API_URL || '').replace(/\/$/, '');

export function loadMovies() {
  return axios.get(`${baseUrl}/movies`).then((response) => response.data.movies || []);
}

export function loadMovie(id) {
  return axios.get(`${baseUrl}/movies/${id}`).then((response) => response.data.movie || null);
}
