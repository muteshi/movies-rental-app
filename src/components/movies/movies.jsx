import React, { Component } from "react";
import _ from "lodash";

import { getGenres } from "../../services/fakeGenreService";
import { getMovies } from "../../services/fakeMovieService";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import MoviesTable from "../moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    itemsPerPage: 4,
    currentPage: 1,
    movieCategories: [],
    selectedCategory: "All movies",
    sortColumn: { path: "title", order: "asc" },
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      movies,
      itemsPerPage,
      currentPage,
      movieCategories,
      selectedCategory,
      sortColumn,
    } = this.state;
    // console.log("RENDERING");

    const filteredMovies =
      selectedCategory === "All movies"
        ? movies
        : movies.filter((movie) => movie.genre.name === selectedCategory);

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedMovies = paginate(sortedMovies, currentPage, itemsPerPage);

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
              <MoviesTable
                paginatedMovies={paginatedMovies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
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
