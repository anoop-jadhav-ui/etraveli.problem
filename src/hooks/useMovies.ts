import { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";

export const useMovies = () => useContext(MoviesContext);
