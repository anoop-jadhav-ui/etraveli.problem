import "./App.css";

import MovieListItem from "./components/MovieListItem/MovieListItem";
import MoviePreview from "./components/MoviePreview/MoviePreview";
import Header from "./components/Header/Header";
import { useState } from "react";
import { useMovies } from "./context/MoviesContext";
import { MovieType } from "./types/MovieType";

const App = () => {
  const { movies, isLoading } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  return (
    <div className="container">
      <Header />
      <main className="content">
        <ul className="movie-list">
          {isLoading && <div className="loading-text">Loading...</div>}
          {!isLoading && movies.length === 0 && (
            <div className="empty-state">No movies found</div>
          )}
          {movies.length > 0 && (
            <>
              {movies.map((movie) => {
                return (
                  <MovieListItem
                    key={movie.episode_id}
                    movie={movie}
                    selectMovie={setSelectedMovie}
                  />
                );
              })}
            </>
          )}
        </ul>
        <MoviePreview movie={selectedMovie} />
      </main>
    </div>
  );
};

export default App;
