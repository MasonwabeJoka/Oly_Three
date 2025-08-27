import CategorySelectorClient from "./CategorySelectorClient";

  interface Category {
    id: number;
    category: string;
    image: string;
    subcategories: string[];
  }

interface CategorySelectorServerProps {
  categories: Category[];
  goTo?: (index: number) => void;
  setCategory?: (main: string, subcategory: string) => void;
}

const CategorySelector = ({
  categories,
  goTo = () => {},
  setCategory = () => {},
}: CategorySelectorServerProps) => {
  const categoriesArray = (arr: string[], size: number) => {
    if (!arr) return [];
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );
  };

  const activeCategory = categories[0] || null;
  const categoriesChunks = activeCategory
    ? categoriesArray(activeCategory.subcategories, 5)
    : [];
  const showButtons = categoriesChunks.length > 4;

  return (
    <CategorySelectorClient
      categories={categories}
      categoriesChunks={categoriesChunks}
      activeCategory={activeCategory}
      showButtons={showButtons}
      goTo={goTo}
      setCategory={setCategory}
    />


  );
};

export default CategorySelector;
