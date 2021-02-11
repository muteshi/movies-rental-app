import React from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Delete from "./common/delete";
import Like from "./common/like";
import Table from "./common/table";

const MoviesTable = ({
  paginatedMovies,
  onLike,
  onDelete,
  onSort,
  sortColumn,
}) => {
  const user = auth.getCurrentUser();
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    {
      path: "genre.name",
      label: "Genre",
    },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: null,
      label: "Like",
      content: (movie) => (
        <Like like={movie.liked} onLike={() => onLike(movie._id)} />
      ),
    },
  ];

  const deleteColumn = {
    path: null,
    label: "Action",
    content: (movie) => <Delete onDelete={onDelete} movie={movie} />,
  };

  // if (user && user.isAdmin) return columns.concat(deleteColumn);

  const newColumns =
    user && user.isAdmin ? columns.concat(deleteColumn) : columns;

  return (
    <Table
      data={paginatedMovies}
      columns={newColumns}
      onDelete={onDelete}
      onLike={onLike}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
