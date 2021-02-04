import React from "react";
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
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: null,
      label: "Like",
      content: (movie) => (
        <Like like={movie.liked} onLike={() => onLike(movie._id)} />
      ),
    },
    {
      path: null,
      label: "Action",
      content: (movie) => <Delete onDelete={() => onDelete(movie)} />,
    },
  ];

  return (
    <Table
      data={paginatedMovies}
      columns={columns}
      onDelete={onDelete}
      onLike={onLike}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
