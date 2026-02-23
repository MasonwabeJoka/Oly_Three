"use client";
import { categories } from "@/data/CategoriesData";
import { FormWrapper } from "./FormWrapper";
import styles from "./SelectACategory.module.scss";
import CategorySelector from "./CategorySelector";
import MobileCategorySelector from "./MobileCategorySelector";
import useFormStore from "../store/useFormStore";
import { useBreakpoint } from "@/store/useBreakpointStore";
interface UploadIdProps {
  onNext: () => void;
}

const SelectACategory = () => {
  const { setCategory, goTo } = useFormStore();
  const { isMobile } = useBreakpoint();
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Select a category</h2>
      </div>
      <div className={styles.wrapper}>
        {!isMobile && (
          <CategorySelector
            categories={categories}
            goTo={goTo}
            setCategory={setCategory}
          />
        )}
        {isMobile && (
          <MobileCategorySelector
            categories={categories}
            goTo={goTo}
            setCategory={setCategory}
          />
        )}
      </div>
    </div>
  );
};

export default SelectACategory;
