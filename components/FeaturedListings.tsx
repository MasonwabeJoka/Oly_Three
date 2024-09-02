"use client";
import styles from "./FeaturedListings.module.scss";
import { useState, useEffect } from "react";
import Button from "@/components/Buttons";
import ListingsCollage from "@/components/ListingsCollage";
import Input from "@/components/Input";
import useTitleStore from "@/store/titleStore";
import { suggestions } from "@/data/SuggestionsData";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Link from "next/link";
import Select from "./Select";

type FormValues = z.infer<typeof searchFormSchema>;

const FeaturedListings = () => {
  const Title = useTitleStore((state) => state.Title);
  const [searchTerm, setSearchTerm] = useState(false);

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
    <div className={styles.listingsSection}>
      <Title className={styles.title}>Featured Listings</Title>
      <div className={styles.collage}>
        <div className={styles.selectContainer}>
          <Select
            options={[
              "All Categories",
              "Properties",
              "Vehicles",
              "Jobs",
              "Services",
            ]}
            currentValue="All Categories"
            selectSize="large"
            label="Categories"
            id="categories"
            name="categories"
            ariaLabel="categories"
            autoFocus={false}
            required={true}
          />
        </div>
        <ListingsCollage
          isDeletable={false}
          isDashboard={false}
          cardSize="standard"
          limit={4}
          page={1}
          sortBy="postedOn"
          sortOrder="desc"
        />
      </div>

      <div className={styles.buttonsAndSearch}>
        <Link href="/listings" className={styles.buttons}>
          <Button
            className={styles.button}
            buttonChildren={"View all listings"}
            buttonType="primary"
            buttonSize="large"
            name="View All Listings Button"
            type="button"
            ariaLabel="View All Listings Button"
            autoFocus={false}
            disabled={false}
          />
        </Link>
        <form
          className={styles.searchFields}
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <div
            className={styles.searchTermContainer}
            onClick={() => setSearchTerm(true)}
          >
            <p className={styles.errorMessage}>{errors.searchTerm?.message}</p>
            <Input
              className={`${styles.input} ${styles.searchTerm}`}
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

          <div className={styles.locationContainer}>
            <p className={styles.errorMessage}>
              {errors.locationSearch?.message}
            </p>
            <Input
              className={`${styles.input} ${styles.location}`}
              isSearchBar={true}
              suggestions={suggestions}
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
        </form>

      </div>
    </div>
  );
};

export default FeaturedListings;
