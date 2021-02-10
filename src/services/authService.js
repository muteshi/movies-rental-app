import jwtDecode from "jwt-decode";
import http from "../services/httpService";
import { baseURL } from "../config.json";

const endpoint = `${baseURL}/auth`;
const tokenKey = "token";

http.setJwt(getJwt());

export async function loginUser(credentials) {
  const { data: jwt } = await http.post(endpoint, credentials);
  localStorage.setItem(tokenKey, jwt);
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}

export async function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
