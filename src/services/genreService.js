import { baseURL } from "../config.json";
import http from "../services/httpService";

export async function getGenres() {
  return await http.get(`${baseURL}/genres`);
}
