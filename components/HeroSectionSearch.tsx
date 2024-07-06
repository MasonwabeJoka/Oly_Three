"use client";
import React, { useState } from "react";
import styles from "./HeroSectionSearch.module.scss";
import Button from "./Buttons";
import Link from "next/link";
import Input from "@/components/Input";
import { suggestions } from "@/data/SuggestionsData";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";
import { useModalStore } from "@/store/modalStore";
import Image from "next/image";

type FormValues = z.infer<typeof searchFormSchema>;

const HeroSectionSearch = () => {
  const [searchTerm, setSearchTerm] = useState(false);
  const showCategoriesModal = useModalStore(
    (state) => state.showCategoriesModal
  );
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
  });
  const { register, control, handleSubmit, setValue, formState } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo }>
            <Image
              src="/logo.png"
              alt="logo"
              width={120}
              height={120}
            />
          </div>
      <form
        id="buttonsAndSearch"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className={styles.buttonsAndSearch}>
          
          <>
            <div className={styles.buttons}>
              <Link
                href="/dashboard/post-your-ad/select-a-category"
                className={styles.link}
              >
                <Button
                  buttonChildren={"Post Your Ad"}
                  className={styles.postYourAdBtn}
                  buttonType="primary"
                  buttonSize="large"
                  name="Post Your Ad Button"
                  type="button"
                  ariaLabel="Post Your Ad Button"
                  autoFocus={false}
                  disabled={false}
                />
              </Link>

              <Button
                buttonChildren={"See All Categories"}
                className={styles.categoriesBtn}
                buttonType="normal"
                buttonSize="large"
                name="Categories Button"
                type="button"
                ariaLabel="Categories Button"
                autoFocus={false}
                disabled={false}
                onClick={() => setShowCategoriesModal(true)}
              />
            </div>

            <div className={styles.searchFields}>
              <div
                className={styles.searchTerm}
                onClick={() => setSearchTerm(true)}
              >
                <p className={styles.errorMessage}>
                  {errors.searchTerm?.message}
                </p>
                <Input
                  className={styles.searchTermInput}
                  isSearchBar={true}
                  suggestions={suggestions}
                  inputType="text"
                  inputSize="large"
                  iconSrcRight="/icons/search.png"
                  iconPosition="right"
                  iconWidth={32}
                  iconHeight={32}
                  label="Search"
                  placeholder="What are you looking for?"
                  id="searchTerm"
                  ariaLabel="Search Term"
                  autoComplete="off"
                  required
                  {...register("searchTerm")}
                  onChange={(e) => {
                    setValue("searchTerm", e.target.value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
              </div>

              <div
                className={styles.searchLocation}
                style={{ marginBottom: 0 }}
              >
                <p className={styles.errorMessage}>
                  {errors.locationSearch?.message}
                </p>
                <Input
                  isSearchBar={true}
                  suggestions={suggestions}
                  className={styles.searchLocationInput}
                  inputType="text"
                  inputSize="large"
                  iconSrcLeft=""
                  iconSrcRight={"/icons/search.png"}
                  iconPosition="right"
                  iconWidth={32}
                  iconHeight={32}
                  label="Location"
                  placeholder="Search by city, province, township..."
                  id="LocationSearch"
                  ariaLabel="Location"
                  autoFocus={false}
                  autoComplete="off"
                  required
                  {...register("locationSearch")}
                  onChange={(e) => {
                    setValue("locationSearch", e.target.value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
              </div>
            </div>
          </>
          <div className={styles.searchButton}>
            <Button
              buttonChildren={"Search"}
              className={styles.search}
              buttonType="normal"
              buttonSize="large"
              name="Search Button"
              type="submit"
              ariaLabel="Search Button"
              autoFocus={false}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default HeroSectionSearch;
