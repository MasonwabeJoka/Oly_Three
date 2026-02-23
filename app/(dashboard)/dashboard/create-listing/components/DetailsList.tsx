"use client";
import styles from "./DetailsList.module.scss";
import Image from "@/components/Image";
import Button from "@/components/Buttons";
import DetailsEditMode from "./DetailsEditMode";
import type { DetailItem } from "./DetailsClient";
import Icon from "@/components/Icon";

interface DetailsListProps {
  details: DetailItem[];
  editIndex: number | null;
  editDetail: (index: number) => void;
  handleDeleteItem: (index: number) => Promise<void>;
  editValue: string;
  setValue: (name: string, value: any, options?: object) => void;
  updateDetail: (index: number, updatedValue: string) => Promise<void>;
  cancelEdit: () => void;
  register: any;
  errors: any;
  watch: any;
}

const DetailsList = ({
  details,
  editIndex,
  editDetail,
  handleDeleteItem,
  editValue,
  setValue,
  updateDetail,
  cancelEdit,
  register,
  errors,
  watch,
}: DetailsListProps) => (
  <ul className={`${styles.details} ${details.length > 0 ? styles.open : ""}`}>
    {details.map((detail, index) =>
      editIndex !== index ? (
        <li key={index} className={styles.detail}>
          <p className={styles.detailText}>
            <span style={{ fontWeight: "600" }}>{detail.selectDetail}:</span>{" "}
            <span>{detail.value}</span>
          </p>
          <div className={styles.detailButtons}>
            <div
              className={styles.editButtonContainer}
              onClick={() => editDetail(index)}
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
          updateDetail={(value: string) => updateDetail(index, value)}
          cancelEdit={cancelEdit}
          register={register}
          errors={errors}
          watch={watch}
        />
      )
    )}
  </ul>
);

export default DetailsList;
