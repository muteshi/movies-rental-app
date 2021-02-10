import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MENUS } from "../../constants/menus";
import Search from "./searchBar";

const NavBar = ({
  query,
  results,
  searchClick,
  setQuery,
  user,
  redirectPath,
}) => {
  const [activeMenu, setActiveMenu] = useState("Movies");

  const handleClick = (menu) => {
    setActiveMenu(menu);
  };
  console.log(user);
  const menus = user
    ? MENUS.filter((menu) => menu.showToLoggedInUser === true)
    : MENUS.filter((menu) => menu.private === false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <Link className="navbar-brand" to="/">
        App Name
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {menus.map((menu) => {
            const activeClassName =
              menu.label === activeMenu ? "nav-item active" : "nav-item";
            if (menu.label) {
              return (
                <li
                  className={activeClassName}
                  key={menu.id}
                  onClick={() => handleClick(menu.label)}
                >
                  <Link className="nav-link" to={menu.path}>
                    {menu.label}
                  </Link>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <Search
          results={results}
          query={query}
          handleClick={searchClick}
          setQuery={setQuery}
          redirectPath={redirectPath}
        />
      </div>
    </nav>
  );
};

export default React.memo(NavBar);
