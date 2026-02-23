"use client";
import styles from "./DetailsList.module.scss";
import Image from "@/components/Image";
import Button from "@/components/Buttons";
import SpecificationsEditMode from "./SpecificationsEditMode";
import type { SpecificationItem } from "./ProductSpecification";

interface SpecificationsListProps {
  specifications: SpecificationItem[];
  editIndex: number | null;
  editSpecification: (index: number) => void;
  handleDeleteSpecification: (index: number) => Promise<void>;
  editValue: string;
  setValue: (name: string, value: any, options?: object) => void;
  updateSpecification: (index: number, updatedValue: string) => Promise<void>;
  cancelEdit: () => void;
  register: any;
  errors: any;
  watch: any;
}

const SpecificationsList = ({
  specifications,
  editIndex,
  editSpecification,
  handleDeleteSpecification,
  editValue,
  setValue,
  updateSpecification,
  cancelEdit,
  register,
  errors,
  watch,
}: SpecificationsListProps) => (
  <ul
    className={`${styles.details} ${specifications.length > 0 ? styles.open : ""}`}
  >
    {specifications.map((specification, index) =>
      editIndex !== index ? (
        <li key={index} className={styles.detail}>
          <div className={styles.detailButtons}>
            <Button
              className={`${styles.editButton} ${styles.detailButton}`}
              buttonChildren={
                <Image
                  src="/icons/pencil.png"
                  alt="edit-icon"
                  width={16}
                  height={16}
                />
              }
              buttonSize="medium"
              dashboard
              buttonType="roundStandardFeed"
              name="edit-btn"
              type="button"
              ariaLabel="Edit Button"
              autoFocus={false}
              disabled={false}
              onClick={() => editSpecification(index)}
            />
            <Button
              className={`${styles.deleteButton} ${styles.detailButton}`}
              buttonChildren={
                <Image
                  src="/icons/trash.png"
                  alt="delete-icon"
                  width={18}
                  height={18}
                />
              }
              buttonSize="medium"
              dashboard
              buttonType="roundStandardFeed"
              name="delete-btn"
              type="button"
              ariaLabel="Delete Button"
              onClick={() => handleDeleteSpecification(index)}
              autoFocus={false}
              disabled={false}
            />
          </div>
          <p className={styles.detailText}>
            {/* <span style={{ fontWeight: "600" }}>{specification.selectSpecification}:</span>{" "} */}
            {specification.value.split(":").map((text, idx, arr) =>
              idx === 0 && arr.length > 1 ? (
                <span key={idx} style={{ fontWeight: "600" }}>
                  {text}:
                </span>
              ) : idx === arr.length - 1 ? (
                <span key={idx}>{text}</span>
              ) : (
                <span key={idx}>{text}:</span>
              )
            )}
          </p>
        </li>
      ) : (
        <SpecificationsEditMode
          key={index}
          editValue={editValue}
          setValue={setValue}
          updateDetail={(value: string) => updateSpecification(index, value)}
          cancelEdit={cancelEdit}
          register={register}
          errors={errors}
          watch={watch}
        />
      )
    )}
  </ul>
);

export default SpecificationsList;
