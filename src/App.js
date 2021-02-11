import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router-dom";

import NavBar from "./components/common/navBar";
import { MENUS } from "./constants/menus";
import { getMovies } from "./services/movieService";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import RegistrationForm from "./components/registerForm";
import Movies from "./components/movies/movies";
import ProtectedRoute from "./components/protectedRoute";
import NotFound from "./components/notFound";
import useCurrentUser from "./hooks/getUser";

function App(props) {
  const { user } = useCurrentUser();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const { data: movies } = await getMovies();
    setMovies(movies);
  };

  const handleClick = ({ target: input }) => {
    const searchQuery = input.value;
    setQuery(searchQuery.trim());

    const searchResults = movies.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(searchResults);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar
        query={query}
        results={results}
        searchClick={handleClick}
        setQuery={setQuery}
        redirectPath="/movies"
        user={user}
      />
      <main className="container">
        <Switch>
          {/* <Route path="/movies/new-movie" component={MovieForm} exact /> */}
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/customers" component={Customers} />
          <Route path="/Rentals" component={Rentals} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" component={Movies} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default React.memo(App);
