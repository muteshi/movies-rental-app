import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import { paginate } from "../../utils/paginate";
import Like from "../common/like";
import Pagination from "../common/pagination";

class Movies extends Component {
  state = {
    movies: [],
    itemsPerPage: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

  handleDelete = (id) => {
    const newMovies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies: newMovies });
  };

  handleLike = (movieId) => {
    const movies = [...this.state.movies];
    const movieIndex = movies.findIndex((movie) => movie._id === movieId);
    movies[movieIndex].liked = !movies[movieIndex].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { movies, itemsPerPage, currentPage } = this.state;
    // console.log("RENDERING");

    const paginatedMovies = paginate(movies, currentPage, itemsPerPage);

    const tableRows = paginatedMovies.map((movie) => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like like={movie.liked} onLike={() => this.handleLike(movie._id)} />
        </td>
        <td>
          <i
            className="fa fa-trash-o"
            aria-hidden="true"
            onClick={() => this.handleDelete(movie._id)}
            style={{ color: "red", cursor: "pointer" }}
          />
        </td>
      </tr>
    ));

    let moviesTable =
      movies.length !== 0 ? (
        <React.Fragment>
          <p>Showing {movies.length} movies in database</p>
          <table className="table table-bordered">
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
          <Pagination
            itemsPerPage={itemsPerPage}
            itemsCount={movies.length}
            pageClicked={currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      ) : (
        <p>No movies in database</p>
      );

    return moviesTable;
  }
}

export default Movies;
