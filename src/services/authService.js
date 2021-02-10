import http from "../services/httpService";
import { baseURL } from "../config.json";

const endpoint = `${baseURL}/auth`;

export function loginUser(credentials) {
  return http.post(endpoint, credentials);
}
