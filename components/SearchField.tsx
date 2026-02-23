import styles from "./SearchField.module.scss";
import Input from "./Input";
import Form from "next/form";
interface SearchFieldProps {
  placeholder: string;
  require: boolean;
  autoComplete: string;
  searchFieldSize: keyof typeof SEARCH_FIELD_SIZE; // any of the properties of SEARCH_FIELD_SIZE
}

const SEARCH_FIELD_SIZE = {
  extraLargeDesktop: `${styles.extraLargeDesktop}`,
  medium: `${styles.medium}`,
  small: `${styles.small}`,
};

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

const SearchField = ({
  searchFieldSize,
  placeholder,
  require,
  autoComplete,
}: SearchFieldProps) => {
  return (
    <Form
      className={styles.searchForm}
      autoComplete={autoComplete}
      name=""

      action={mockServerAction}
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
    </Form>
  );
};

export default SearchField;
