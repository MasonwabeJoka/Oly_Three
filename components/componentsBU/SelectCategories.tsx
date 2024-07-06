import styles from "./SelectCategories.module.scss";
import LinkCard from "@/components/cards/LinkCard";
import { categories } from "@/data/CategoriesData";
import Button from "@/components/Buttons";
import useTitleStore from "@/store/titleStore";
import { useModalStore } from "@/store/modalStore";

const SelectCategories = () => {
  const Title = useTitleStore((state) => state.Title);
  const { showModal, setShowModal } = useModalStore();

  return (
    <div className={styles.categoriesSection}>
      <div className={styles.titleContainer}>
        <Title className={styles.title}>Discover more</Title>
      </div>
      <div className={styles.categoriesContainer}>
        {categories.slice(0, 12).map((label, index) => {
          return (
            <LinkCard
              key={index}
              label={label.category}
              cardSize="large"
              image="/bear.jpg"
            />
          );
        })}
      </div>

      <Button
        className={styles.button}
        buttonChildren={"More Categories..."}
        buttonSize="large"
        buttonType="normal"
        name="More Categories Button"
        type="button"
        ariaLabel="More Categories Button"
        autoFocus={false}
        disabled={false}
        onClick={() => setShowModal(true)}
      />
    </div>
  );
};

export default SelectCategories;
