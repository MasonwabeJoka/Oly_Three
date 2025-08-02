"use client";
import { categories } from "@/data/CategoriesData";
import { FormWrapper } from "./FormWrapper";
import styles from "./SelectACategory.module.scss";
import CategorySelector from "./CategorySelector";
import MobileCategorySelector from "./MobileCategorySelector";
import useFormStore from "../store/useFormStore";

const SelectACategory = () => {
  const { setCategory, goTo } = useFormStore();
  return (
    <FormWrapper title="Select a category">
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Select a category</h2>
        </div>
        <div className={styles.wrapper}>
          <CategorySelector
            categories={categories}
            goTo={goTo}
            setCategory={setCategory}
          />
          <MobileCategorySelector
            categories={categories}
            goTo={goTo}
            setCategory={setCategory}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default SelectACategory;
