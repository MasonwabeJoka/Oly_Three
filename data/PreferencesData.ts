export const preferencesData = [
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
            buttonType: 'radio',
            minWidth: 7.5,
            value: "english"
          }, 
          {
            id: 2,
            label: "Afrikaans",
            buttonType: 'radio',
            minWidth: 7.5,
            value: "afrikaans"
          }
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
            buttonType: 'radio',
            minWidth: 7.5,
            value: "light"
          }, 
          {
            id: 2,
            label: "Dark",
            buttonType: 'radio',
            minWidth: 7.5,
            value: "dark"
          }, 
          {
            id: 3,
            label: "System",
            buttonType: 'radio',
            minWidth: 7.5,
            value: "system"
          }
        ],
        selectedValue: "light",
      },
    ]
  },
];
