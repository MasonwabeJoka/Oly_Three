import React, { useState, useEffect } from "react";
import TextArea from "@/components/TextArea";
import Button from "@/components/Buttons";
import Icon from "@/components/Icon";
import styles from "./EditMode.module.scss";

type EditModeProps = {
  editValue: string;
  updateDetail: (updatedValue: string) => void;
  cancelEdit: () => void;
  setValue: any;
  register: any;
  errors: any;
  watch: any;
};

const EditMode = ({
  editValue,
  updateDetail,
  cancelEdit,
  setValue,
  register,
  errors,
  watch,
}: EditModeProps) => {
  const [updatedDetail, setUpdatedDetail] = useState(editValue);
  const editedDetail = watch("editDetail");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedDetail(e.target.value);
  };

  useEffect(() => {
    setUpdatedDetail(editedDetail);
  }, [editedDetail]);

  const handleSubmitEdit = () => {
    updateDetail(updatedDetail); // Call the update function with the new value
  };


  return (
    <div className={styles.editMode}>
       <TextArea
        className={styles.editDetail}
        id="edit-detail"
        name="editDetail"
        size="large"
        label="Edit Detail"
        required={true}
        hasSubmitButton={false}
        value={updatedDetail} 
        onChange={handleChange}
        {...register("editDetail")}
        error={errors.editDetail?.message as string}
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

export default EditMode;
