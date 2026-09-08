"use client";
import React from "react";
import styles from "./SelectACategory.module.scss";
import MobileSubcategories from "@/components/MobileSubcategories";
import Button from "@/components/Button";
import { useFormContext } from "react-hook-form";

const MobileCategorySelector = ({
  categories,
  goTo = () => {},
  setCategory = () => {},
}: {
  categories: Array<{ id: number; category: string; subcategories: { id: number; name: string; }[] }>;
  goTo?: (index: number) => void;
  setCategory?: (main: string, subcategory: string) => void;
}) => {
  const { setValue, trigger } = useFormContext();
  const [activeCategoryId, setActiveCategoryId] = React.useState<number | null>(null);

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
      <ul className={styles.mobileSubcategoriesContainer}>
        {categories.map((categoryItem) => (
          <li key={categoryItem.id}>
            <MobileSubcategories
              options={categoryItem.subcategories.map(sub => sub.name)}
              category={categoryItem.category}
              id={categoryItem.id}
              name={categoryItem.category}
              ariaLabel={categoryItem.category}
              onSubcategorySelect={(subcategory: string) =>
                handleSubcategoryClick(subcategory)
              }
            />
          </li>
        ))}
      </ul>
      <div className={styles.goBackButtonContainer}>
        <Button
          className={styles.goBackButton}
          children="Go Back"
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="Go Back Button"



        />
      </div>
    </>
  );
};

export default MobileCategorySelector;