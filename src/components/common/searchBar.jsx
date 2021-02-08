import React from "react";
import { Link } from "react-router-dom";

const Search = ({ results, handleClick, query, setQuery, redirectPath }) => {
  return (
    <form className="form-inline my-2 my-lg-0">
      <div>
        <input
          className="form-control mr-sm-2"
          type="search"
          name="q"
          value={query}
          onChange={handleClick}
          placeholder="Search"
        />
        {query.length !== 0 && (
          <div className="search-results">
            <ul className="list-group">
              {results.map((res) => (
                <li key={res._id} className="list-group-item">
                  <Link
                    to={`${redirectPath}/${res._id}`}
                    onClick={() => setQuery("")}
                  >
                    {res.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

export default React.memo(Search);
