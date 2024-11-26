import styles from "./Header.module.css";

import { useMovies } from "../../hooks/useMovies";
import SortByButton from "../SortByButton/SortByButton";

const Header = () => {
  const { setSearchKeyword } = useMovies();
  return (
    <header className={styles.header}>
      <SortByButton />
      <input
        name="search"
        aria-label="Type to search..."
        placeholder="Type to search..."
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </header>
  );
};

export default Header;
