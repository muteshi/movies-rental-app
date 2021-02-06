import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ searchData }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleClick = ({ target: input }) => {
    const searchQuery = input.value;
    setQuery(searchQuery.trim());

    const searchResults = searchData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(searchResults);
  };

  return (
    <form className="form-inline my-2 my-lg-0">
      <div>
        <input
          className="form-control mr-sm-2"
          type="search"
          value={query}
          onChange={handleClick}
          placeholder="Search"
          aria-label="Search"
        />
        {query.length !== 0 && (
          <div className="search-results">
            <ul class="list-group">
              {results.map((res) => (
                <li key={res._id} class="list-group-item">
                  <Link to={`/movies/${res._id}`} onClick={() => setQuery("")}>
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

export default Search;
