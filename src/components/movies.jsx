import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utilities/paginate";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: "All Genres",
	};

	componentDidMount() {
		const genres = [{ name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movie };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			genres,
			selectedGenre,
		} = this.state;

		if (count === 0) return <p>There are no movies in the database</p>;

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies;

		const movies = paginate(filtered, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<p>Showing {filtered.length} movies in the database.</p>
					<MoviesTable
						movies={movies}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
					/>
					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
