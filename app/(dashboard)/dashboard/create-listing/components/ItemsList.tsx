"use client";
import styles from "./DetailsList.module.scss";
import DetailsEditMode from "./DetailsEditMode";
import Icon from "@/components/Icon";

interface Item {
  selectDetail?: string;
  selectSpecification?: string;
  value: string;
}

interface ItemsListProps {
  items: Item[];
  editIndex: number | null;
  editItem: (index: number) => void;
  handleDeleteItem: (index: number) => Promise<void>;
  editValue: string;
  setValue: (name: string, value: any, options?: object) => void;
  updateItem: (index: number, updatedValue: string) => Promise<void>;
  cancelEdit: () => void;
  register: any;
  errors: any;
  watch: any;
  type: 'details' | 'specifications';
}

const ItemsList = ({
  items,
  editIndex,
  editItem,
  handleDeleteItem,
  editValue,
  setValue,
  updateItem,
  cancelEdit,
  register,
  errors,
  watch,
  type,
}: ItemsListProps) => {
  const renderItemText = (item: Item) => {
    if (type === 'details') {
      return (
        <>
          <span style={{ fontWeight: "600" }}>{item.selectDetail}:</span>{" "}
          <span>{item.value}</span>
        </>
      );
    } else {
      const colonIndex = item.value.indexOf(':');
      if (colonIndex > 0) {
        const boldPart = item.value.substring(0, colonIndex);
        const normalPart = item.value.substring(colonIndex + 1);
        return (
          <>
            <span style={{ fontWeight: "600" }}>{boldPart}:</span>
            <span>{normalPart}</span>
          </>
        );
      }
      return <span>{item.value}</span>;
    }
  };

  return (
    <ul className={`${styles.details} ${items.length > 0 ? styles.open : ""}`}>
      {items.map((item, index) =>
        editIndex !== index ? (
          <li key={index} className={styles.detail}>
            <p className={styles.detailText}>
              {renderItemText(item)}
            </p>
            <div className={styles.detailButtons}>
              <div
                className={styles.editButtonContainer}
                onClick={() => editItem(index)}
              >
                <Icon
                  className={styles.deleteButton}
                  src={"/icons/pencil.png"}
                  alt="edit-icon"
                  width={12}
                  height={12}
                />
              </div>
              <div
                className={styles.deleteButtonContainer}
                onClick={() => handleDeleteItem(index)}
              >
                <Icon
                  className={styles.deleteButton}
                  src={"/icons/x.svg"}
                  alt="delete-icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </li>
        ) : (
          <DetailsEditMode
            key={index}
            editValue={editValue}
            setValue={setValue}
            updateDetail={(value: string) => updateItem(index, value)}
            cancelEdit={cancelEdit}
            register={register}
            errors={errors}
            watch={watch}
          />
        )
      )}
    </ul>
  );
};

export default ItemsList;