import Customers from "../components/customers";
import LoginForm from "../components/loginForm";
import Logout from "../components/logout";
import MovieForm from "../components/movieForm";
import Movies from "../components/movies/movies";
import RegistrationForm from "../components/registerForm";
import Rentals from "../components/rentals";

export const MENUS = [
  {
    label: "Movies",
    private: false,
    id: "movies",
    showToLoggedInUser: true,
    path: "/",
    component: Movies,
  },
  {
    label: "Customers",
    id: "customers",
    private: false,
    showToLoggedInUser: true,
    path: "/customers",
    component: Customers,
  },
  {
    label: "Rentals",
    private: false,
    id: "rentals",
    showToLoggedInUser: true,
    path: "/rentals",
    component: Rentals,
  },
  {
    label: "Login",
    id: "login-form",
    showToLoggedInUser: false,
    path: "/login",
    private: false,
    component: LoginForm,
  },
  {
    label: "Logout",
    id: "logout",
    path: "/logout",
    showToLoggedInUser: true,
    private: true,
    component: Logout,
  },
  {
    label: "Register",
    id: "register-form",
    showToLoggedInUser: false,
    private: false,
    path: "/register",
    component: RegistrationForm,
  },
  {
    label: "New Movie",
    id: "new-movie-form",
    private: true,
    showToLoggedInUser: true,
    path: "/movies/new-movie",
    component: MovieForm,
  },
];
