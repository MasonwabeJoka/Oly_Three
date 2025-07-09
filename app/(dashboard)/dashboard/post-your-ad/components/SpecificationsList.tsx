"use client";
import styles from "./DetailsList.module.scss";
import Image from "next/image";
import Button from "@/components/Buttons";
import EditMode from "./EditMode";
import type { DetailItem } from "./Details";

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

const SpecificationsList = ({
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
  <ul className={styles.details}>
    {details.map((detail, index) =>
      editIndex !== index ? (
        <li key={index} className={styles.detail}>
          <div className={styles.detailButtons}>
            <Button
              className={`${styles.editButton} ${styles.detailButton}`}
              buttonChildren={
                <Image
                  src="/icons/pencil.png"
                  alt="edit-icon"
                  width={18}
                  height={18}
                />
              }
              buttonSize="standard"
              dashboard
              buttonType="roundStandardFeed"
              name="edit-btn"
              type="button"
              ariaLabel="Edit Button"
              autoFocus={false}
              disabled={false}
              onClick={() => editDetail(index)}
            />
            <Button
              className={`${styles.deleteButton} ${styles.detailButton}`}
              buttonChildren={
                <Image
                  src="/icons/trash.png"
                  alt="delete-icon"
                  width={24}
                  height={24}
                />
              }
              buttonSize="standard"
              dashboard
              buttonType="roundStandardFeed"
              name="delete-btn"
              type="button"
              ariaLabel="Delete Button"
              onClick={() => handleDeleteItem(index)}
              autoFocus={false}
              disabled={false}
            />
          </div>
          <p className={styles.detailText}>
            <span style={{ fontWeight: "600" }}>{detail.selectDetail}:</span>{" "}
            <span>{detail.value}</span>
          </p>
        </li>
      ) : (
        <EditMode
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

export default SpecificationsList;