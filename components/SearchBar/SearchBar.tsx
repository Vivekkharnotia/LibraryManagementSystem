import styles from "./searchBar.module.css";
import searchIcon from "../../public/searchIcon.svg"
import Image from "next/image";

function SearchBar() {
  return (
    <div className={styles.searchBar}>

      <div className={styles.searchBar_input_container}>
        <input placeholder="Search..." type="text" />
      </div>

      <div className={styles.searchBar_icon}>
        <Image src={searchIcon} alt="Search Icon"/>
      </div>
    </div>
  );
}

export default SearchBar;
