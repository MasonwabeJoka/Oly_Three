"use client";
import React from "react";
import styles from "./SelectACategory.module.scss";
import MobileSubcategories from "@/components/MobileSubcategories";
import Button from "@/components/Buttons";
import { useFormContext } from "react-hook-form";

const MobileCategorySelector = ({
  categories,
  goTo = () => {},
  setCategory = () => {},
}: {
  categories: Array<{ id: number; category: string; subcategories: string[] }>;
  goTo?: (index: number) => void;
  setCategory?: (main: string, subcategory: string) => void;
}) => {
  const { setValue, trigger } = useFormContext();

const handleSubcategoryClick = async (subcategory: string) => {
  const selectedCategory = categories.find((cat) => cat.id === activeCategoryId);
  if (selectedCategory) {
    setValue("category.main", selectedCategory.category, { shouldValidate: true }); // Use title as main
    setValue("category.subcategory", subcategory, { shouldValidate: true });
    const isValid = await trigger(["category.main", "category.subcategory"]);
    if (isValid) {
      setCategory(selectedCategory.category, subcategory); // Pass main and subcategory
      goTo(1);
    }
  }
};

  return (
    <>
      <div className={styles.mobileSubcategoriesContainer}>
        {categories.map((categoryItem) => (
          <div key={categoryItem.id}>
            <MobileSubcategories
              options={categoryItem.subcategories}
              category={categoryItem.category}
              id={categoryItem.id}
              name={categoryItem.category}
              ariaLabel={categoryItem.category}
              onSubcategorySelect={(subcategory) =>
                handleSubcategoryClick(subcategory)
              }
            />
          </div>
        ))}
      </div>
      <div className={styles.goBackButtonContainer}>
        <Button
          className={styles.goBackButton}
          buttonChildren="Go Back"
          buttonType="normal"
          buttonSize="large"
          name="go-back-btn"
          type="button"
          ariaLabel="Go Back Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
        />
      </div>
    </>
  );
};

export default MobileCategorySelector;