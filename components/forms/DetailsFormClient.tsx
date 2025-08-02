"use client";
import styles from "./DetailsForm.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import { ConditionsData } from "@/data/ConditionsData";
import { DetailsData } from "@/data/DetailsData";
import { featuresData } from "@/data/FeaturesData";
import { detailsFormSchema } from "@/lib/validations/formValidations";
import EditModeForm from "@/components/forms/EditModeForm";
import SelectedDetail from "./SelectedDetail";
import Form from "next/form";

export type DetailsFormProps = {};

type FormValues = z.infer<typeof detailsFormSchema>;

const DetailsFormClient = (props: DetailsFormProps) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(detailsFormSchema),
  });

  const {
    register,
    control,
    handleSubmit: submitDetails,
    formState,
    setValue,
    watch,
  } = form;
  const {
    register: registerSelectedDetail,
    handleSubmit: handleSubmitSelectedDetail,
  } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const { errors: errorsSelectedDetail } = formState;
  const [detailId, setDetailId] = useState<string | null>(null);
  const selectDetail = watch("selectDetail");

  const onSubmitDetail = (data: FormValues) => {
    console.log(data);
    setDetailId(null);
    // Perform any additional actions here
  };

  const editDetail = (id: string) => {
    setDetailId(id);
  };

  const conditions = ConditionsData.map((detail) => detail.condition);
  const details = DetailsData.map((detail) => detail.detail);

  let matchFound = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name as keyof FormValues, e.target.value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(e.target.name as keyof FormValues, e.target.value, {
      shouldTouch: true,
    });
  };

  // Mock server action for demonstration
  async function mockServerAction(formData: FormData): Promise<void> {
    // Simulate server-side processing
    await new Promise((resolve) => setTimeout(resolve, 500));
    // No return value needed
  }

  return (
    <div className={styles.container}>
      <Form
        className={styles.form}
        action={mockServerAction}
        onSubmit={submitDetails(onSubmitDetail)}
      >
        <fieldset className={styles.titleContainer}>
          <legend className={styles.title}>Product Details</legend>
        </fieldset>
        <div className={styles.formElements}>
          <div className={styles.conditionsContainer}>
            <Select
              options={conditions}
              className={styles.conditions}
              currentValue="Condition"
              selectSize="large"
              selectColourType="normal"
              label="Choose a condition"
              id="conditions"
              ariaLabel="Conditions"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={true}
              multiple={false}
              {...register("condition")}
              onChange={(e) => {
                setValue("condition", e.target.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
              error={errors.condition?.message as string}
            />
          </div>
          <div className={styles.selecteDetailContainer}>
            <Select
              options={details}
              className={styles.selectDetail}
              currentValue="Choose details to include"
              selectSize="large"
              selectColourType="normal"
              label="Choose a detail"
              id="choose-detail"
              ariaLabel="Choose Detail Select"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={true}
              multiple={false}
              {...register("selectDetail")}
            />
          </div>

          {DetailsData.map((detail) => {
            if (!matchFound && selectDetail === detail.detail) {
              matchFound = true;
              return (
                <SelectedDetail
                  id={detail.id}
                  detail={detail.detail}
                  description={detail.description}
                  example={detail.example}
                  key={detail.id}
                  register={registerSelectedDetail}
                  setValue={setValue}
                  errors={errorsSelectedDetail}
                  handleSubmit={handleSubmitSelectedDetail}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
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
                <EditModeForm />
              )
            )}
          </ul>
        </div>
        <div className={styles.submitDetailContainer}>
          <Button
            className={styles.submitDetailButton}
            buttonChildren="Submit Detail"
            buttonType="primary"
            buttonSize="large"
            name="submit-detail-btn"
            type="submit"
            ariaLabel="Submit Detail Button"
            autoFocus={false}
            disabled={isSubmitting}
          />
        </div>
      </Form>
    </div>
  );
};

export default DetailsFormClient;
