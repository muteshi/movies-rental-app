import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/common/navBar";
import { MENUS } from "./constants/menus";
import { getMovies } from "./services/fakeMovieService";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieData = getMovies();
    setMovies(movieData);
  }, []);

  return (
    <React.Fragment>
      <NavBar data={movies} />
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

export default App;
