"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import { suggestions } from "@/data/SuggestionsData";
import styles from "./ListingsSearchClient.module.scss";

type FormValues = z.infer<typeof searchFormSchema>;

const ListingsSearchClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const locationSearch = searchParams.get("locationSearch") || "";

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm,
      locationSearch,
    },
  });

  useEffect(() => {
    reset({
      searchTerm,
      locationSearch,
    });
  }, [searchTerm, locationSearch, reset]);

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchTerm", data.searchTerm);
    params.set("locationSearch", data.locationSearch);
    router.push(`/listings?${params.toString()}`);
    // (eventually: trigger backend search here)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.searchFields}>
      <Controller
        name="searchTerm"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            className={styles.searchTermInput}
            isSearchBar={true}
            suggestions={suggestions}
            inputType="text"
            inputSize="large"
            label="Search"
            placeholder="What are you looking for?"
            id="searchTerm"
            error={errors.searchTerm?.message}
            ariaLabel="Search Term"
            autoComplete="off"
            required
          />
        )}
      />
      <Controller
        name="locationSearch"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            className={styles.searchLocationInput}
            isSearchBar={true}
            suggestions={suggestions}
            inputType="text"
            inputSize="large"
            label="Location"
            placeholder="Search by city, province, town..."
            id="locationSearch"
            error={errors.locationSearch?.message}
            ariaLabel="Location"
            autoComplete="off"
            required
          />
        )}
      />
      <Button
        buttonChildren="Search"
        className={styles.search}
        buttonType="normal"
        buttonSize="large"
        name="Search Button"
        type="submit"
        ariaLabel="Search Button"
        autoFocus={false}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ListingsSearchClient;
