import React from "react";
import Like from "./common/like";

const MoviesTable = ({
  paginatedMovies,
  onLike,
  onDelete,
  onSort,
  sortColumn,
}) => {
  const raiseSort = (path) => {
    let sortCol = { ...sortColumn };
    if (sortCol.path === path)
      sortCol = sortCol.order === "asc" ? "desc" : "asc";
    else {
      sortCol.path = path;
      sortCol.order = "asc";
    }
    onSort(sortCol);
  };

  const tableRows = paginatedMovies.map((movie) => (
    <tr key={movie._id}>
      <td>{movie.title}</td>
      <td>{movie.genre.name}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td>
        <Like like={movie.liked} onLike={() => onLike(movie._id)} />
      </td>
      <td>
        <i
          className="fa fa-trash-o"
          aria-hidden="true"
          onClick={() => onDelete(movie._id)}
          style={{ color: "red", cursor: "pointer" }}
        />
      </td>
    </tr>
  ));

  return (
    <table className="table table-bordered ">
      <thead>
        <tr>
          <th onClick={() => raiseSort("title")} scope="col">
            Title
          </th>
          <th onClick={() => raiseSort("genre.name")} scope="col">
            Genre
          </th>
          <th onClick={() => raiseSort("numberInStock")} scope="col">
            Stock
          </th>
          <th onClick={() => raiseSort("dailyRentalRate")} scope="col">
            Rate
          </th>
          <th scope="col">Like</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default MoviesTable;
