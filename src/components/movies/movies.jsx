import React, { Component } from "react";
import { getGenres } from "../../services/fakeGenreService";
import { getMovies } from "../../services/fakeMovieService";
import { paginate } from "../../utils/paginate";
import Like from "../common/like";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";

class Movies extends Component {
  state = {
    movies: [],
    itemsPerPage: 4,
    currentPage: 1,
    movieCategories: [],
    selectedCategory: "All movies",
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      movieCategories: [
        { name: "All movies", _id: "all_movies" },
        ...getGenres(),
      ],
    });
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

  handleSelectedGenre = (categoryName) => {
    this.setState({ selectedCategory: categoryName, currentPage: 1 });
  };

  render() {
    const {
      movies,
      itemsPerPage,
      currentPage,
      movieCategories,
      selectedCategory,
    } = this.state;
    // console.log("RENDERING");

    const filteredMovies =
      selectedCategory === "All movies"
        ? movies
        : movies.filter((movie) => movie.genre.name === selectedCategory);

    const paginatedMovies = paginate(filteredMovies, currentPage, itemsPerPage);

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
          <div className="row">
            <div className="col-sm-3">
              <ListGroup
                categories={movieCategories}
                selectedCategory={selectedCategory}
                itemsPerCategory={3}
                onCategorySelect={this.handleSelectedGenre}
              />
            </div>
            <div className="col-sm-9">
              <p className="mt-2">
                Showing {paginatedMovies.length} movies in database
              </p>
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
              <Pagination
                itemsPerPage={itemsPerPage}
                itemsCount={filteredMovies.length}
                pageClicked={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <p>No movies in database</p>
      );

    return moviesTable;
  }
}

export default Movies;
