import http from "../services/httpService";
import { baseURL } from "../config.json";

const endpoint = `${baseURL}/users`;

export function saveUser(userData) {
  return http.post(endpoint, userData);
}
