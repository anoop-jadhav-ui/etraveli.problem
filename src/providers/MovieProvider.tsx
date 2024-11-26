import { useEffect, useMemo, useState } from "react";
import { MoviesContext } from "../context/MoviesContext";
import { MovieType } from "../types/MovieType";
import { SortOptions } from "../types/SortType";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState<SortOptions>("episode_id");

  useEffect(() => {
    setLoading(true);
    fetch("https://swapi.dev/api/films/?format=json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [movies, searchKeyword]);

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => {
      if (sortBy === "episode_id") {
        return a.episode_id - b.episode_id;
      }
      if (sortBy === "release_date") {
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        );
      }
      return 0;
    });
  }, [sortBy, filteredMovies]);

  return (
    <MoviesContext.Provider
      value={{
        movies: sortedMovies,
        isLoading,
        sortBy,
        setSearchKeyword,
        setSortBy,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
