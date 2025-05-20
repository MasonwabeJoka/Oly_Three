import { PreferenceCategory } from "./../app/(dashboard)/dashboard/settings/preferences/types";

export const preferencesData: PreferenceCategory[] = [
  {
    id: 1,
    preferenceCategory: "General Preferences",
    preferences: [
      {
        id: 1,
        preferenceType: "Language Preferences",
        preference: "Select your preferred language for the website",
        options: [
          {
            id: 1,
            label: "English",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "english",
          },
          {
            id: 2,
            label: "Afrikaans",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "afrikaans",
          },
        ],
        selectedValue: "english",
      },
      {
        id: 2,
        preferenceType: "Theme Preferences",
        preference: "Select your preferred theme for the website",
        options: [
          {
            id: 1,
            label: "Light",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "light",
          },
          {
            id: 2,
            label: "Dark",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "dark",
          },
          {
            id: 3,
            label: "System",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "system",
          },
        ],
        selectedValue: "light",
      },
    ],
  },
  {
    id: 2,
    preferenceCategory: "Test Preferences",
    preferences: [
      {
        id: 1,
        preferenceType: "Language Preferences",
        preference: "Select your preferred language for the website",
        options: [
          {
            id: 1,
            label: "English",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "english",
          },
          {
            id: 2,
            label: "Afrikaans",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "afrikaans",
          },
        ],
        selectedValue: "english",
      },
      {
        id: 2,
        preferenceType: "Theme Preferences",
        preference: "Select your preferred theme for the website",
        options: [
          {
            id: 1,
            label: "Light",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "light",
          },
          {
            id: 2,
            label: "Dark",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "dark",
          },
          {
            id: 3,
            label: "System",
            buttonType: "radio" as const,
            minWidth: 7.5,
            value: "system",
          },
        ],
        selectedValue: "light",
      },
    ],
  },
];