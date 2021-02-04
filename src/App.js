import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/common/navBar";
import { MENUS } from "./constants/menus";

function App() {
  return (
    <React.Fragment>
      <NavBar />
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
