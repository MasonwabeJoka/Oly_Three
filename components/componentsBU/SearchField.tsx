import styles from "./SearchField.module.scss";
import Input from "./Input";
interface SearchFieldProps {
  placeholder: string;
  require: boolean;
  autoComplete: string;
  searchFieldSize: keyof typeof SEARCH_FIELD_SIZE; // any of the properties of SEARCH_FIELD_SIZE
}

const SEARCH_FIELD_SIZE = {
  largeDesktop: `${styles.largeDesktop}`,
  medium: `${styles.medium}`,
  small: `${styles.small}`,
};

const SearchField = ({
  searchFieldSize,
  placeholder,
  require,
  autoComplete,
}: SearchFieldProps) => {
  return (
    <form
      className={styles.searchForm}
      autoComplete={autoComplete}
      name=""
      target="self"
    >
      <div className={styles.searchFieldContainer}>
        <input
          className={`${SEARCH_FIELD_SIZE[searchFieldSize]}  ${styles.searchField}`}
          autoFocus
          type="search"
          id="user"
          name="username"
          placeholder={placeholder}
          required={require}
        />

        <div className={styles.iconContainer}>Search Icon</div>
      </div>
    </form>
  );
};

export default SearchField;
