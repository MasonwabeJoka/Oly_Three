import { useState } from "react";
import styles from "./SearchBar.module.scss";
import Input from "@/components/Input";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);

  let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to became Freelancer",
    "How to became Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
  ];

  const handleInputChange = (e: any) => {
    const typedValue = e.target.value;
    setInputValue(typedValue);
    if (typedValue) {
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(typedValue.toLowerCase())
      );
      setActiveSuggestions(filteredSuggestions);
    } else {
      setActiveSuggestions([]);
    }
  };

  const selectedSuggestion = (suggestion: any) => {
    setInputValue(suggestion);
    setActiveSuggestions([]);
  };

  return (
    <div className={styles.container}>
      <Input
        className={styles.searchBar}
        inputType="text"
        inputColourType="normal"
        inputSize={""}
        iconSrcRight="/icon.svg"
        iconPosition="right"
        iconWidth={32}
        iconHeight={32}
        label={""}
        placeholder={""}
        id={""}
        name={""}
        ariaLabel={""}
        value={inputValue && inputValue}
        onChange={handleInputChange}
        autoFocus={false}
        required={true}
      />
      {activeSuggestions.length > 0 && (
        <ul className={styles.searchSuggestions}>
          {activeSuggestions.map((suggestion, index) => {
            return (
              <li key={index} onClick={() => selectedSuggestion(suggestion)}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
