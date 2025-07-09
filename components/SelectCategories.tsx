
"use client";

import styles from "./SelectACategories.module.scss";
import { FormWrapper } from "@/app/(dashboard)/dashboard/post-your-ad/components/FormWrapper";
import useFormStore from "@/app/(dashboard)/dashboard/post-your-ad/store/useFormStore";
import { categories } from "@/data/CategoriesData";
import CategorySelector from "@/app/(dashboard)/dashboard/post-your-ad/components/CategorySelector";
import MobileCategorySelector from "@/app/(dashboard)/dashboard/post-your-ad/components/MobileCategorySelector";


const SelectACategory = () => {
  const { goTo, setCategory } = useFormStore(); 


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