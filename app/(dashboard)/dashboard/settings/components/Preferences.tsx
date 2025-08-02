"use client";
import { useState } from "react";
import styles from "./Preferences.module.scss";
import { preferencesData } from "@/data/PreferencesData";
import PreferencesCard from "@/components/cards/PreferencesCard";
import { Preference, PreferenceCategory } from "../preferences/types";
import Form from "next/form";
import Link from "next/link";
import Button from "@/components/Buttons";

const Preferences = () => {
  // Initialize state with preferencesData
  const [preferences, setPreferences] =
    useState<PreferenceCategory[]>(preferencesData);

  // Handle changes to selectedValue for a specific preference
  const handlePreferenceChange = (
    categoryId: number,
    preferenceId: number,
    newValue: string
  ) => {
    setPreferences((prevPreferences) =>
      prevPreferences.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              preferences: category.preferences.map((pref) =>
                pref.id === preferenceId
                  ? { ...pref, selectedValue: newValue }
                  : pref
              ),
            }
          : category
      )
    );
  };

    const myAction = () => {
    console.log("My Action");
  };

  return (
    <Form action={myAction} className={styles.container}>
      {preferences.map((preferenceCategory) => (
        <PreferencesCard
          key={preferenceCategory.id}
          preferenceCategory={preferenceCategory.preferenceCategory}
          preferences={preferenceCategory.preferences}
          onChange={(preferenceId: number, newValue: string) =>
            handlePreferenceChange(
              preferenceCategory.id,
              preferenceId,
              newValue
            )
          }
        />
      ))}
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.acceptPreferences}
          buttonChildren="Accept Preferences"
          buttonType="primary"
          buttonSize="large"
          name="accept-preferences-btn"
          type="submit"
          ariaLabel="Accept Preferences"
          autoFocus={false}
          disabled={false}
          onClick={() => {}}
          dashboard
        />

        <Link href="/dashboard/settings">
          <Button
            className={styles.backButton}
            buttonChildren="Back"
            buttonType="normal"
            buttonSize="large"
            name="back-btn"
            type="button"
            ariaLabel="Back"
            autoFocus={false}
            disabled={false}
            onClick={() => {}}
            dashboard
          />
        </Link>
      </div>
    </Form>
  );
};

export default Preferences;
