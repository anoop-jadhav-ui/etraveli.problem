import { useState } from "react";
import styles from "./SortByButton.module.css";
import { useMovies } from "../../context/MoviesContext";

const SortByButton = () => {
  const { sortBy, setSortBy } = useMovies();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSortByButtonClick = () => {
    setIsFilterOpen((prevValue) => !prevValue);
  };

  return (
    <div className={styles.soryByContainer}>
      <button onClick={handleSortByButtonClick}>Sort By</button>
      {isFilterOpen && (
        <ul className={styles.sortOptions}>
          <li>
            <label htmlFor="episode">
              <input
                type="radio"
                id="episode"
                name="filterBy"
                checked={sortBy === "episode_id"}
                onClick={() => {
                  setSortBy("episode_id");
                  setIsFilterOpen(false);
                }}
              />
              <span>Episode</span>
            </label>
          </li>
          <li>
            <label htmlFor="release-year">
              <input
                type="radio"
                id="release-year"
                name="filterBy"
                checked={sortBy === "release_date"}
                onClick={() => {
                  setSortBy("release_date");
                  setIsFilterOpen(false);
                }}
              />
              <span>Release date</span>
            </label>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortByButton;
