export interface PreferenceOption {
  id: number;
  label: string;
  buttonType: 'radio';
  minWidth: number;
  value: string;
}

export interface Preference {
  id: number;
  preferenceType: string;
  preference: string;
  options: PreferenceOption[];
  selectedValue: string;
}

export interface PreferenceCategory {
  id: number;
  preferenceCategory: string;
  preferences: Preference[];
}

export type PreferencesData = PreferenceCategory[];