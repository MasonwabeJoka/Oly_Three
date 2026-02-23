import React, { useState, useEffect } from "react";
import TextArea from "@/components/TextArea";
import Button from "@/components/Buttons";
import Icon from "@/components/Icon";
import styles from "./EditMode.module.scss";

type SpecificationsEditModeProps = {
  editValue: string;
  updateDetail: (updatedValue: string) => void;
  cancelEdit: () => void;
  setValue: any;
  register: any;
  errors: any;
  watch: any;
};

const SpecificationsEditMode = ({
  editValue,
  updateDetail,
  cancelEdit,
  setValue,
  register,
  errors,
  watch,
}: SpecificationsEditModeProps) => {
  const [updatedSpecification, setUpdatedSpecification] = useState(editValue);
  const editedSpecification = watch("editSpecification");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedSpecification(e.target.value);
  };

  useEffect(() => {
    setUpdatedSpecification(editedSpecification);
  }, [editedSpecification]);

  const handleSubmitEdit = () => {
    updateDetail(updatedSpecification);
  };

  return (
    <div className={styles.editMode}>
      <TextArea
        className={styles.editDetail}
        id="edit-specification"
        name="editSpecification"
        size="large"
        label="Edit Specification"
        required={true}
        hasSubmitButton={false}
        value={updatedSpecification}
        onChange={handleChange}
        {...register("editSpecification")}
        error={errors.editSpecification?.message as string}
      />
      <div className={`${styles.cancelButton} ${styles.editButton}`}>
        <Button
          className={styles.cancel}
          buttonChildren={
            <div className={styles.iconContainer}>
              <Icon
                className={styles.icon}
                src="/icons/x.svg"
                alt="submit-icon"
                width={20}
                height={20}
              />
            </div>
          }
          buttonType="icon"
          buttonSize=""
          name="cancel-edit-btn"
          type="button"
          ariaLabel="Cancel Edit"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={cancelEdit}
        />
      </div>
      <div className={`${styles.submitButton} ${styles.editButton}`}>
        <Button
          className={styles.submit}
          buttonChildren={
            <div className={styles.iconContainer}>
              <Icon
                className={styles.icon}
                src="/icons/check.png"
                alt="submit-icon"
                width={20}
                height={20}
              />
            </div>
          }
          buttonType="icon"
          buttonSize=""
          name="submit-edit-btn"
          type="button"
          ariaLabel="Submit Edit"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={handleSubmitEdit}
        />
      </div>
    </div>
  );
};

export default SpecificationsEditMode;
