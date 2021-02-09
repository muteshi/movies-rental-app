import http from "../services/httpService";
import { baseURL } from "../config.json";

const endpoint = `${baseURL}/movies`;

const movieUrl = (id) => {
  return `${endpoint}/${id}`;
};

export function getMovies() {
  return http.get(`${endpoint}`);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  const { _id: movieId } = movie;
  if (movieId) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movieId), body);
  }
  return http.post(`${endpoint}`, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
