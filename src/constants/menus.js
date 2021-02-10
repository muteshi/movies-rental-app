import Customers from "../components/customers";
import LoginForm from "../components/loginForm";
import MovieForm from "../components/movieForm";
import Movies from "../components/movies/movies";
import NotFound from "../components/notFound";
import RegistrationForm from "../components/registerForm";
import Rentals from "../components/rentals";

export const MENUS = [
  {
    label: null,
    id: "movie-details",
    path: "/movies/:id",
    private: true,
    component: MovieForm,
  },
  {
    label: "Movies",
    private: false,
    id: "movies",
    path: "/",
    component: Movies,
  },
  {
    label: "Customers",
    id: "customers",
    private: false,
    path: "/customers",
    component: Customers,
  },
  {
    label: "Rentals",
    private: false,
    id: "rentals",
    path: "/rentals",
    component: Rentals,
  },
  {
    label: "Login",
    id: "login-form",
    path: "/login",
    private: false,
    component: LoginForm,
  },
  {
    label: "Register",
    id: "register-form",
    private: false,
    path: "/register",
    component: RegistrationForm,
  },
  {
    label: "New Movie",
    id: "new-movie-form",
    private: true,
    path: "/movies/new-movie",
    component: MovieForm,
  },
  {
    label: null,
    private: false,
    id: "not-found",
    path: "/not-found",
    component: NotFound,
  },
];
