"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";
import Select from "@/components/Select";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import TextArea from "@/components/TextArea";
import { ConditionsData } from "@/data/ConditionsData";
import { DetailsData } from "@/data/DetailsData";
import { FeaturesData } from "@/data/FeaturesData";

// Todo: If you type in the chosen details container and click any of the drop down or edit or delete buttons,
// without submitting a detail there should be a popup confirming if you want to submit.

const Details = () => {
  const [detailId, setDetailId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleChange = (event: any) => {
    setSelectedDetail(event.target.value);
  };
  const editDetail = (id) => {
    setDetailId(id);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    setDetailId(null);
  };

  const conditions = ConditionsData.map((detail) => detail.condition);
  const details = DetailsData.map((detail) => detail.detail);

  const enterDetail = (e: any) => {
    e.preventDefault();
    const detail = e.target.value.trim();

    if (e.key === "Enter" && detail) {
      let details: any = localStorage.getItem("details");

      if (!details) {
        details = [];
      }

      let detailItem = { id: 1, detail: detail };
      details.push(detailItem);

      localStorage.setItem("details", JSON.stringify(details));
    }
  };

  let matchFound = false; // match found is there to prevent duplicates
  // TODO: On edit mode the textarea should grow with text.
  //TODO: Fix more input and submitDetail button so that submitDetailContainer button is displayed until the button is clicked
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <legend className={styles.titleContainer}>
          <h4 className={styles.title}>Product Details</h4>
        </legend>
        <div className={styles.formElements}>
          <div className={styles.conditionsContainer}>
            <Select
              options={conditions}
              className={styles.conditions}
              initialValue="Condition"
              selectSize="large"
              selectColourType="normal"
              label="Choose a condition"
              name="conditions"
              id="conditions"
              ariaLabel="Conditions"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={false}
              multiple={false}
            />
          </div>
          <div className={styles.chooseDetailContainer}>
            <Select
              options={details}
              className={styles.chooseDetail}
              initialValue="See a list of details to you can include"
              selectSize="large"
              selectColourType="normal"
              label="Choose a detail"
              name="choose-detail"
              id="choose-detail"
              ariaLabel="Choose Detail Select"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={false}
              multiple={false}
              onChange={handleChange}
            />
          </div>
          {DetailsData.map((detail) => {
            // matchFound is there to prevent duplicates
            if (!matchFound && selectedDetail === detail.detail) {
              matchFound = true;
              return (
                <>
                  <div key={detail.id} className={styles.chosenDetailContainer}>
                    <p className={styles.chosenDetailTitle}>{detail.detail}</p>
                    <p className={styles.chosenDetailDescription}>
                      {detail.description}
                    </p>
                    <div className={styles.chosenDetail}>
                      <Input
                        className={styles.chosenDetailInput}
                        inputType="text"
                        inputColourType="normal"
                        inputSize="large"
                        label="Chosen Detail"
                        placeholder={`Eg: ${detail.example.length > 55 ? detail.example.slice(0, 55) +'...' : detail.example}` }
                        id="detail"
                        name="detail"
                        ariaLabel="Chosen Detail"
                        autoFocus={false}
                        iconSrcRight=""
                        iconPosition="right"
                        iconWidth={32}
                        iconHeight={32}
                        required={true}
                        autoComplete="off"
                        onKeyUp={enterDetail}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                      />
                    </div>

                    {isInputFocused && selectedDetail === "Custom Details" && (
                      <div className={styles.chosenDetail}>
                        <Input
                          className={`${styles.chosenDetailInput} ${styles.moreInput}`}
                          inputType="text"
                          inputColourType="normal"
                          inputSize="large"
                          label="More Details"
                          placeholder="More Details"
                          id="more-details"
                          name="more-details"
                          ariaLabel="More Details"
                          autoFocus={false}
                          iconSrcRight=""
                          iconPosition="right"
                          iconWidth={32}
                          iconHeight={32}
                          required={true}
                          autoComplete="off"
                          onKeyUp={enterDetail}
                        />
                      </div>
                    )}

                    <div className={styles.submitButtonContainer}>
                      <Button
                        className={styles.proceedButton}
                        buttonChildren="Submit Detail"
                        buttonType="normal"
                        type="submit"
                        buttonSize="large"
                        name="proceed-btn"
                        ariaLabel="Proceed Button"
                        autoFocus={false}
                        disabled={false}
                        dashboard
                      />
                    </div>
                  </div>
                </>
              );
            } else {
              return null;
            }
          })}

          <ul className={styles.details}>
            {FeaturesData.map((detail) =>
              detailId !== detail.id ? (
                <li key={detail.id} className={styles.detail}>
                  <div className={styles.detailButtons}>
                    <div className={styles.editButtonContainer}>
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
                        buttonType="roundStandardFeed"
                        buttonSize=""
                        name="edit-btn"
                        type="button"
                        ariaLabel="Edit Button"
                        autoFocus={false}
                        disabled={false}
                        onClick={() => editDetail(detail.id)} // Pass the detail id
                      />
                    </div>
                    <div className={styles.deleteButtonContainer}>
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
                        buttonType="roundStandardFeed"
                        buttonSize=""
                        name="delete-btn"
                        type="button"
                        ariaLabel="Delete Button"
                        autoFocus={false}
                        disabled={false}
                      />
                    </div>
                  </div>
                  <h4 className={styles.detailText}>{detail.feature}</h4>
                </li>
              ) : (
                <div className={styles.editMode}>
                  <TextArea
                    className={styles.editDetail}
                    id="edit-detail"
                    name="edit-detail"
                    size="large"
                    label="Edit Detail"
                    required={false}
                  />
                  <div className={styles.submitButtonContainer}>
                    <Button
                      className={`${styles.submitButton} ${styles.detailButton}`}
                      buttonChildren={
                        <Image
                          src="/icons/x.svg"
                          alt="submit-icon"
                          width={20}
                          height={20}
                        />
                      }
                      buttonType="roundStandardFeed"
                      buttonSize=""
                      name="submit-btn"
                      type="button"
                      ariaLabel="Submit Button"
                      autoFocus={false}
                      disabled={false}
                      onClick={submitEdit}
                    />
                  </div>
                </div>
              )
            )}
          </ul>

          <div className={styles.buttons}>
            <Link href="/dashboard/post-your-ad/price">
              <Button
                className={styles.proceedButton}
                buttonChildren="Proceed"
                buttonType="primary"
                buttonSize="large"
                name="proceed-btn"
                type="button"
                ariaLabel="Proceed Button"
                autoFocus={false}
                disabled={false}
                dashboard
              />
            </Link>

            <Link href="/dashboard/post-your-ad/select-a-category">
              <Button
                className={styles.backButton}
                buttonChildren="Back"
                buttonType="normal"
                buttonSize="large"
                name="back-btn"
                type="button"
                ariaLabel="Back Button"
                autoFocus={false}
                disabled={false}
                dashboard
              />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Details;
