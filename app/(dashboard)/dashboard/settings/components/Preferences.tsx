"use client";
import { useState } from "react";
import styles from "./Preferences.module.scss";
import { preferencesData } from "@/data/PreferencesData";
import PreferencesCard from "@/components/cards/PreferencesCard";
import { Preference, PreferenceCategory } from "../preferences/types";
import Form from "next/form";

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
    </Form>
  );
};

export default Preferences;
