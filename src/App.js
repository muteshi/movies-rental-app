import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import NavBar from "./components/common/navBar";
import { MENUS } from "./constants/menus";
import { getMovies } from "./services/movieService";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const userData = jwtDecode(jwt);
      setUser(userData);
    } catch (error) {}
  }, [setUser]);

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
          {MENUS.map((menu) => (
            <Route
              path={menu.path}
              component={menu.component}
              key={menu.id}
              exact
            />
          ))}
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default React.memo(App);
