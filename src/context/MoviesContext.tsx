import { createContext } from "react";
import { MovieType } from "../types/MovieType";
import { SortOptions } from "../types/SortType";

export interface MoviesContextType {
  movies: MovieType[];
  isLoading: boolean;
  sortBy: SortOptions;
  setSearchKeyword: (keyword: string) => void;
  setSortBy: (sortBy: SortOptions) => void;
}

const defaultValues: Partial<MoviesContextType> = {
  movies: [],
};

export const MoviesContext = createContext<MoviesContextType>(
  defaultValues as MoviesContextType
);
