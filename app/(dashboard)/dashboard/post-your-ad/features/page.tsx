"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";
import Select from "@/components/Select";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import TextArea from "@/components/TextArea";
import { FeaturesData } from "@/data/FeaturesData";

const Features = () => {
  const [featureId, setFeatureId] = useState(null);

  const editFeature = (id) => {
    setFeatureId(id);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    setFeatureId(null);
  };

  const features = FeaturesData.map((feature) => feature.feature);

  const enterFeature = (e: any) => {
    e.preventDefault();
    const feature = e.target.value.trim();

    if (e.key === "Enter" && feature) {
      let features: any = localStorage.getItem("features");

      if (!features) {
        features = [];
      }

      let featureItem = { id: 1, feature: feature };
      features.push(featureItem);

      localStorage.setItem("features", JSON.stringify(features));
    }
  };

  // TODO: Fix Select so you are able to replace initial text with selected item
  // TODO: On edit mode the textarea should grow with text.

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <legend className={styles.titleContainer}>
          <h4 className={styles.title}>Specifications</h4>
        </legend>
        <div className={styles.formElements}>
          <div className={styles.chooseFeatureContainer}>
            <Select
              options={features}
              className={styles.chooseFeature}
              initialValue="Choose a feature"
              selectSize="large"
              selectColourType="normal"
              label="Choose a specification"
              name="choose-feature"
              id="choose-feature"
              ariaLabel="Choose Feature Select"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={false}
              multiple={false}
            />
          </div>
          <div className={styles.submitFeatureContainer}>
            <Input
              className={styles.submitFeature}
              inputType="text"
              inputColourType="normal"
              inputSize="large"
              label="Features"
              placeholder="Enter descriptive details like model, size or weight."
              id="feature"
              name="feature"
              ariaLabel="Submit feature"
              autoFocus={false}
              iconSrcRight=""
              iconPosition="right"
              iconWidth={32}
              iconHeight={32}
              required={true}
              autoComplete="off"
              onKeyUp={enterFeature}
            />
          </div>

          <ul className={styles.features}>
            {FeaturesData.map((feature) =>
              featureId !== feature.id ? (
                <li key={feature.id} className={styles.feature}>
                  <div className={styles.featureButtons}>
                    <div className={styles.editButtonContainer}>
                      <Button
                        className={`${styles.editButton} ${styles.featureButton}`}
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
                        // onClick={editFeature}
                        onClick={() => editFeature(feature.id)} // Pass the feature id
                      />
                    </div>
                    <div className={styles.deleteButtonContainer}>
                      <Button
                        className={`${styles.deleteButton} ${styles.featureButton}`}
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
                  <h4 className={styles.featureText}>{feature.feature}</h4>
                </li>
              ) : (
                <div className={styles.editMode}>
                  <TextArea
                    className={styles.editFeature}
                    id="edit-feature"
                    name="edit-feature"
                    size="large"
                    label="Edit Feature"
                    required={false}
                  />
                  <div className={styles.submitButtonContainer}>
                    <Button
                      className={`${styles.submitButton} ${styles.featureButton}`}
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
            <Link href="/dashboard/post-your-ad/details">
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

export default Features;
