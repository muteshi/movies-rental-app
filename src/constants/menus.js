import Customers from "../components/customers";
import LoginForm from "../components/loginForm";
import MovieForm from "../components/movieForm";
import Movies from "../components/movies/movies";
import NotFound from "../components/notFound";
import Rentals from "../components/rentals";

export const MENUS = [
  {
    label: null,
    id: "movie-details",
    path: "/movies/:id",
    component: MovieForm,
  },
  { label: "Movies", id: "movies", path: "/", component: Movies },
  {
    label: "Customers",
    id: "customers",
    path: "/customers",
    component: Customers,
  },
  { label: "Rentals", id: "rentals", path: "/rentals", component: Rentals },
  {
    label: "Login",
    id: "login-form",
    path: "/login",
    component: LoginForm,
  },
  { label: null, id: "not-found", path: "/not-found", component: NotFound },
];
