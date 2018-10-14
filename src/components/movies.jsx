import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";
import _ from "lodash";
export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    //pagination: getMovies().slice(0, 4),
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Geres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = id => {
    let movies = this.state.movies.filter(movie => movie._id !== id);
    this.setState({ movies });
    this.renderMoviesNumber();
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });

    //my way for paginate
    // const movies = [...this.state.movies];
    // const index = this.state.pageSize * (page - 1);
    // const pagination = movies.slice(index, index + 4);
    // this.setState({ pagination });
    // console.log(this.state.pagination);
  };
  renderMoviesNumber(count) {
    return (
      <div className="row " style={{ margin: 20 }}>
        Showing {count} in the DataBase
      </div>
    );
  }

  handleGenraSelect = genre => {
    //reset currentPage when change the filter
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allmovies
    } = this.state;
    const searchPage = this.getPagedData();
    // if (count === 0) return <p>No movies to show</p>;
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allmovies.filter(m => m.genre._id === selectedGenra._id)
    //     : allmovies;
    // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = searchPage.data;

    console.log(searchPage.data);
    return (
      <div className="row">
        <div className="col-3 ">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenra}
            onItemSelected={this.handleGenraSelect}
          />
        </div>
        <div className="col">
          <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ marginBottom: 20 }}
          >
            New Movies
          </Link>
          {this.renderMoviesNumber(this.getPagedData().totalCount)}
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />

          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={this.getPagedData().totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
