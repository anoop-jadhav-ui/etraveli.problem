import styles from "./MovieListItem.module.css";
import { MovieType } from "../../types/MovieType";

interface MovieListItemProps {
  movie: MovieType;
  selectMovie: (movie: MovieType) => void;
}

const MovieListItem = ({ movie, selectMovie }: MovieListItemProps) => {
  return (
    <li
      key={movie.episode_id}
      className={styles.movieListItem}
      tabIndex={0}
      role="listitem"
      onClick={() => selectMovie(movie)}
    >
      <p className={styles.episodeNo}>{`EPISODE ${movie.episode_id}`}</p>
      <h4 className={styles.title}>{movie.title}</h4>
      <p className={styles.releaseDate}>{movie.release_date}</p>
    </li>
  );
};

export default MovieListItem;
