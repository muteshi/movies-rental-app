import React, { Component } from "react";
import _ from "lodash";
import queryString from "query-string";
import { toast } from "react-toastify";

import { getGenres } from "../../services/genreService";
import { deleteMovie, getMovies } from "../../services/movieService";
import { paginate } from "../../utils/utils";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import MoviesTable from "../moviesTable";
// import logger from "../../services/logService";

class Movies extends Component {
  state = {
    movies: [],
    itemsPerPage: 4,
    currentPage: 1,
    movieCategories: [],
    selectedCategory: "All movies",
    sortColumn: { path: "title", order: "asc" },
    searchQuery: null,
  };

  async componentDidMount() {
    let search = queryString.parse(this.props.location.search);
    search = Object.keys(search).length === 0 ? "" : search.q;
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({
      searchQuery: search,
      movies,
      movieCategories: [{ name: "All movies", _id: "all_movies" }, ...genres],
    });
  }

  handleDelete = async (id) => {
    const originalMovies = this.state.movies;
    const newMovies = originalMovies.filter((movie) => movie._id !== id);
    this.setState({ movies: newMovies });
    try {
      const { data, status } = await deleteMovie(id);
      if (status === 200) toast.success(`${data.title} successfully deleted`);
    } catch (error) {
      if (error && error.response.status === 404) {
        toast.error("This movie has already been deleted");
        this.setState({ movies: originalMovies });
      }
    }
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

  filterMovies = () => {
    if (this.state.searchQuery)
      return this.state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.state.searchQuery)
      );

    if (this.state.selectedCategory !== "All movies")
      return this.state.movies.filter(
        (movie) => movie.genre.name === this.state.selectedCategory
      );
    return this.state.movies;
  };

  render() {
    const {
      itemsPerPage,
      currentPage,
      movieCategories,
      selectedCategory,
      sortColumn,
    } = this.state;

    const filteredMovies = this.filterMovies();

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedMovies = paginate(sortedMovies, currentPage, itemsPerPage);

    let moviesTable =
      filteredMovies.length !== 0 ? (
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
