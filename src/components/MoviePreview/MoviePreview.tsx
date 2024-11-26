import styles from "./MoviePreview.module.css";
import { MovieType } from "../../hooks/useMovies";

const MoviePreview = ({ movie }: { movie: MovieType | null }) => {
  return (
    <aside className={styles.preview} data-testid="preview">
      {!movie && <h2>Click on a movie to see the preview</h2>}
      {movie && (
        <>
          <h2>{movie.title}</h2>
          <p>{movie.opening_crawl}</p>
          <p className={styles.director}>Director: {movie.director}</p>
        </>
      )}
    </aside>
  );
};

export default MoviePreview;
