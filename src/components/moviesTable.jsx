import React from "react";
import Like from "./common/like";

const MoviesTable = ({ paginatedMovies, onLike, onDelete }) => {
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
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col">Like</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default MoviesTable;
