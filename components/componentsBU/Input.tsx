"use client";
import styles from "./Input.module.scss";
import Image from "next/image";
import { useState, forwardRef, Ref } from "react";
import useSidebarStore from "@/store/useSidebarStore";

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  isSearchBar?: boolean;
  suggestions?: string[];
  className?: string;
  inputType: keyof typeof INPUT_TYPE;
  accept?: string;
  inputSize: keyof typeof INPUT_SIZE.regular | keyof typeof INPUT_SIZE.feed;
  inputColourType?: keyof typeof INPUT_COLOUR_TYPE;
  iconPosition?: "left" | "right" | "leftRight";
  iconSrcLeft?: string;
  iconSrcRight?: string;
  label: string;
  placeholder?: string;
  id: string;
  name: string;
  ariaLabel: string;
  autoFocus: boolean;
  iconWidth?: number;
  iconHeight?: number;
  autoComplete?: "on" | "off";
  readonly?: boolean;
  required: boolean;
  inputDescription?: string;
  form?: string;
  initialValue?: any;
  setterValue?: any;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onDoubleClick?: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  onMouseLeave?: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onSelect?: (event: React.UIEvent<HTMLInputElement>) => void;
  onDragStart?: (event: React.DragEvent<HTMLInputElement>) => void;
  onDragEnd?: (event: React.DragEvent<HTMLInputElement>) => void;
  [key: string]: any;
  onContextMenu?: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  onCopy?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onCut?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onCompositionEnd?: (event: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionStart?: (
    event: React.CompositionEvent<HTMLInputElement>
  ) => void;
  onCompositionUpdate?: (
    event: React.CompositionEvent<HTMLInputElement>
  ) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onInvalid?: (event: React.FormEvent<HTMLInputElement>) => void;
  onScroll?: (event: React.UIEvent<HTMLInputElement>) => void;
  onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
  onAnimationStart?: (event: React.AnimationEvent<HTMLInputElement>) => void;
  onAnimationEnd?: (event: React.AnimationEvent<HTMLInputElement>) => void;
  onAnimationIteration?: (
    event: React.AnimationEvent<HTMLInputElement>
  ) => void;
  onTransitionEnd?: (event: React.TransitionEvent<HTMLInputElement>) => void;
}

const INPUT_TYPE = {
  button: `${styles.button}`,
  checkbox: `${styles.checkbox}`,
  color: `${styles.color}`,
  date: `${styles.date}`,
  datetimeLocal: `${styles.datetimeLocal}`,
  email: `${styles.email}`,
  file: `${styles.file}`,
  hidden: `${styles.hidden}`,
  image: `${styles.image}`,
  month: `${styles.month}`,
  number: `${styles.number}`,
  password: `${styles.password}`,
  radio: `${styles.radio}`,
  range: `${styles.range}`,
  reset: `${styles.reset}`,
  search: `${styles.search}`,
  submit: `${styles.submit}`,
  tel: `${styles.tel}`,
  text: `${styles.text}`,
  time: `${styles.time}`,
  url: `${styles.url}`,
  week: `${styles.week}`,
};

const INPUT_SIZE = {
  regular: {
    xxLarge: `${styles.xxLarge}`,
    xLarge: `${styles.xLarge}`,
    large: `${styles.large}`,
    medium: `${styles.medium}`,
    "": "",
  },
  feed: {
    xxLarge: `${styles.xxLargeFeed}`,
    xLarge: `${styles.xLargeFeed}`,
    large: `${styles.largeFeed}`,
    medium: `${styles.mediumFeed}`,
    "": "",
  },
};

const INPUT_COLOUR_TYPE = {
  primary: `${styles.primary}`,
  normal: `${styles.normal}`,
  round: `${styles.round}`,
  outlined: `${styles.outlined}`,
  success: `${styles.success}`,
  warning: `${styles.warning}`,
  danger: `${styles.danger}`,
  info: `${styles.info}`,
  link: `${styles.linkBtn}`,
  "": "",
};

const Input = forwardRef(
  (
    {
      isSearchBar,
      suggestions,
      className,
      inputType,
      accept,
      inputSize,
      inputColourType = "normal",
      iconPosition,
      iconSrcLeft,
      iconSrcRight,
      label,
      placeholder,
      id,
      name,
      ariaLabel,
      autoFocus,
      iconWidth,
      iconHeight,
      autoComplete = "off",
      readonly,
      required,
      inputDescription,
      form,
      initialValue = "",
      onChange,
      onKeyUp,
      children,
      ...otherProps
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ): JSX.Element => {
    const [value, setValue] = useState(initialValue);
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
    const [revealedSuggestions, setRevealedSuggestions] = useState<string[]>(
      []
    );



    const handleInternalChange = (e) => {
      const typedValue = e.target.value;
      setValue(typedValue);
      if (onChange) onChange(e);

      if (typedValue.trim() === "") {
        setRevealedSuggestions([]);
      } else {
        setRevealedSuggestions(
          suggestions?.filter((suggestion) =>
            suggestion.toLowerCase().startsWith(typedValue.toLowerCase())
          ) || []
        );
      }
    };

    const handleSuggestionClick = (suggestion) => {
      setValue(suggestion);
      setRevealedSuggestions([]);
    };

    
    const clearInputAndSuggestions = () => {
      setValue("");
      setRevealedSuggestions([]);
    };

    let sizeClass = isSidebarOpen
      ? INPUT_SIZE.feed[inputSize]
      : INPUT_SIZE.regular[inputSize];
    const inputClass = `${styles.input} ${
      INPUT_TYPE[inputType] || ""
    } ${sizeClass} ${INPUT_COLOUR_TYPE[inputColourType] || ""} ${className}`;


    return (
      <div className={styles.container}>
        {children}

        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          {iconPosition === "left" && iconSrcLeft && (
            <Image
              src={iconSrcLeft}
              alt={`${ariaLabel} Icon Left`}
              width={iconWidth}
              height={iconHeight}
            />
          )}
          <input
            className={inputClass}
            {...otherProps}
            type={inputType}
            placeholder={placeholder}
            id={id}
            name={name}
            accept={accept}
            value={value}
            onChange={handleInternalChange}
            onKeyUp={onKeyUp}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            readOnly={readonly}
            required={required}
            ref={ref}
          />
          {/* {error && <p className={styles.error}>{error.message}</p>} */}
          {iconPosition && (
            <>
              {iconPosition === "right" || iconPosition === "leftRight" ? (
                <div
                  className={styles.rightIconContainer}
                  onClick={clearInputAndSuggestions}
                >
                  {iconSrcRight ? (
                    <Image
                      className={styles.rightIcon}
                      src={
                        value
                          ? "/icons/X.png"
                          : iconSrcRight || "/icons/search.png"
                      }
                      alt={`${ariaLabel} Icon}`}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  ) : value ? (
                    <Image
                      className={styles.rightIcon}
                      src={"/icons/X.png"}
                      alt={`${ariaLabel} Icon}`}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className={styles.rightIconContainer}></div>
              )}
            </>
          )}
        </div>
        {inputDescription && <p>{inputDescription}</p>}

        {isSearchBar && revealedSuggestions.length > 0 && (
          <ul className={styles.searchSuggestions}>
            {revealedSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={sizeClass}
              >
                <div className={styles.suggestion}>
                  <span>{suggestion}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default Input;
