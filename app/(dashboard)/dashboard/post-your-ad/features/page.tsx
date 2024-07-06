"use client";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Select from "@/components/Select";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import TextArea from "@/components/TextArea";
import { ConditionsData } from "@/data/ConditionsData";
import { DetailsData } from "@/data/DetailsData";
import { featuresData } from "@/data/FeaturesData";
import { DevTool } from "@hookform/devtools";
import { detailsFormSchema } from "@/lib/validations/formValidations";
import Icon from "@/components/Icon";

type FormValues = z.infer<typeof detailsFormSchema>;
// TODO: On edit mode the textarea should grow with text.
//TODO: Fix more input and submitDetail button so that submitDetailContainer button is displayed until the button is clicked
const Features = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      selectedDetail: "",
      condition: "",
      detail: "",
      moreDetails: "",
      editDetail: "",
    },
  });

  const { register, control, handleSubmit, formState, setValue, watch } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const [detailId, setDetailId] = useState(null);
  const selectedDetail = watch("selectedDetail");

  const onSubmit = (data) => {
    console.log(data);
    setDetailId(null);
    // Perform any additional actions here
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    // const isValid = await handleSubmit(onSubmit)();
    if (isValid) {
      router.push("/dashboard/post-your-ad/features");
    }
  };

  const handleBack = async (e) => {
    e.preventDefault();
    // const isValid = await handleSubmit(onSubmit)();
    if (isValid) {
      router.push("/dashboard/post-your-ad/select-a-category");
    }
  };

  const editDetail = (id) => {
    setDetailId(id);
  };

  const conditions = ConditionsData.map((detail) => detail.condition);
  const details = DetailsData.map((detail) => detail.detail);

  const enterDetail = (e) => {
    const detail = e.target.value.trim();
    if (e.key === "Enter" && detail) {
      let details = JSON.parse(localStorage.getItem("details") || "[]");
      const detailItem = { id: 1, detail };
      details.push(detailItem);
      localStorage.setItem("details", JSON.stringify(details));
    }
  };

  let matchFound = false;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.titleContainer}>
          <legend className={styles.title}>Product Details</legend>
        </fieldset>
        <div className={styles.formElements}>
          <div className={styles.conditionsContainer}>
            <p className={styles.errorMessage}>{errors.condition?.message}</p>
            <Select
              options={conditions}
              className={styles.conditions}
              initialValue="Condition"
              selectSize="large"
              selectColourType="normal"
              label="Choose a condition"
              id="conditions"
              ariaLabel="Conditions"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={false}
              multiple={false}
              {...register("condition")}
              onChange={(e: any) => {
                setValue("condition", e.target.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
            />
          </div>
          <div className={styles.chooseDetailContainer}>
            <p className={styles.errorMessage}>
              {errors.selectedDetail?.message}
            </p>
            <Select
              options={details}
              className={styles.chooseDetail}
              initialValue="See a list of details you can include"
              selectSize="large"
              selectColourType="normal"
              label="Choose a detail"
              id="choose-detail"
              ariaLabel="Choose Detail Select"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={false}
              multiple={false}
              {...register("selectedDetail")}
              onChange={(e: any) => {
                setValue("selectedDetail", e.target.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
            />
          </div>

          {DetailsData.map((detail) => {
            // matchFound is there to prevent duplicates
            if (!matchFound && selectedDetail === detail.detail) {
              matchFound = true;
              return (
                <>
                  <p className={styles.errorMessage}>
                    {errors.detail?.message}
                  </p>

                  <div key={detail.id} className={styles.chosenDetailContainer}>
                    <p className={styles.chosenDetailTitle}>{detail.detail}</p>
                    <p className={styles.chosenDetailDescription}>
                      {detail.description}
                    </p>
                    {/* Todo: Limit characters to 20 and add... at the end. */}
                    <div className={styles.chosenDetail}>
                      <Input
                        className={styles.chosenDetailInput}
                        inputType="text"
                        inputColourType="normal"
                        inputSize="large"
                        label="Chosen Detail"
                        placeholder={`Eg: ${
                          detail.example.length > 55
                            ? detail.example.slice(0, 55) + "..."
                            : detail.example
                        }`}
                        id="detail"
                        ariaLabel="Chosen Detail"
                        autoFocus={false}
                        iconSrcRight=""
                        iconPosition="right"
                        iconWidth={32}
                        iconHeight={32}
                        required={true}
                        autoComplete="off"
                        onKeyUp={enterDetail}
                        {...register("detail")}
                        onChange={(e: any) => {
                          setValue("detail", e.target.value, {
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                        }}
                      />
                    </div>

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
                        onClick={handleSubmit(onSubmit)}
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
            {featuresData.map((detail) =>
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
                        onClick={() => editDetail(detail.id)}
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
                  <p className={styles.detailText}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Earum, perspiciatis odio qui nihil nesciunt repellat ducimus
                    iste voluptatem quod recusandae.
                  </p>
                </li>
              ) : (
                <div key={detail.id} className={styles.editMode}>
                  <p className={styles.errorMessage}>
                    {errors.editDetail?.message}
                  </p>
                  <TextArea
                    className={styles.editDetail}
                    id="edit-detail"
                    size="large"
                    label="Edit Detail"
                    required={false}
                    {...register("editDetail")}
                    onChange={(e: any) => {
                      setValue("editDetail", e.target.value, {
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />
                  <div
                    className={styles.submitButton}
                    onClick={handleSubmit(onSubmit)}
                  >
                    <div className={styles.iconContainer}>
                      <Icon
                        className={styles.icon}
                        src="/icons/check.png"
                        alt="submit-icon"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </ul>

          <nav className={styles.buttons}>
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
              onClick={handleProceed}
            />

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
              onClick={()=> router.push("/dashboard/post-your-ad/select-a-category")}
            />
          </nav>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Features;
