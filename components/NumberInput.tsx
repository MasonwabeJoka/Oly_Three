import styles from "./NumberInput.module.scss";
import Image from "next/image";
import { useRef, useState } from "react";
import useSidebarStore from "@/store/useSidebarStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
interface InputProps {
  className?: string;
  inputSize:
    | keyof typeof INPUT_SIZE.regular
    | keyof typeof INPUT_SIZE.feed
    | keyof typeof INPUT_SIZE.dashboard;
  inputColourType?: keyof typeof INPUT_COLOUR_TYPE;
  label: string;
  placeholder?: string;
  id: string;
  name: string;
  ariaLabel: string;
  autoFocus: boolean;
  autoComplete?: "on" | "off";
  readonly?: boolean;
  required: boolean;
  dashboard?: boolean;
  inputDescription?: string;
  form?: string;
  initialValue?: any;
  setterValue?: any;
  value?: string;
  upArrowFunction?: (event: any) => void;
  downArrowFunction?: (event: any) => void;
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
  dashboard: {
    xxLarge: `${styles.xxLargeDashboard}`,
    xLarge: `${styles.xLargeDashboard}`,
    large: `${styles.largeDashboard}`,
    medium: `${styles.mediumDashboard}`,
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

const NumberInput = ({
  className,
  inputSize,
  inputColourType,
  placeholder,
  dashboard,
  upArrowFunction,
  downArrowFunction,
  label,
  id,
  name,
  ariaLabel,
  autoFocus,
  autoComplete,
  readonly,
  required,
  inputDescription,
  form,
  initialValue = 0,
  setterValue,
  onChange,
}: InputProps): JSX.Element => {
  const [value, setValue] = useState(0);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const [isPlaceholderActive, setIsPlaceholderActive] = useState(true);
  const [internalPlaceholder, setInternalPlaceholder] = useState(placeholder);
  const inputRef = useRef<HTMLInputElement>(null);

  const incrementValue = (event) => {
    if (onChange) onChange(event);
    setValue((prevValue) => prevValue + 1);
    setIsPlaceholderActive(false);
  };

  const decrementValue = (event) => {
    if (onChange) onChange(event);
    setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
    setIsPlaceholderActive(false);
  };

  const handleChange = (event) => {
    const inputVal = event.target.value;
    const newValue = parseInt(inputVal, 10);

    if (onChange) onChange(event);

    if (inputVal === "") {
      setIsPlaceholderActive(true);
      setValue(0);
    } else if (!isNaN(newValue) && newValue >= 0) {
      setValue(newValue);
      setIsPlaceholderActive(false);
    }
  };

  const handleFocus = () => {
    setIsPlaceholderActive(false);
    setInternalPlaceholder("");
  };

  useOnClickOutside(inputRef, () => {
    if (value === 0) {
      setIsPlaceholderActive(true);
      setInternalPlaceholder(placeholder);
    }
  });

  let sizeClass = "";
  sizeClass = isSidebarOpen
    ? INPUT_SIZE.feed[inputSize]
    : dashboard
      ? INPUT_SIZE.dashboard[inputSize]
      : INPUT_SIZE.regular[inputSize];

  const inputClass = `${styles.input} ${sizeClass} ${
    inputColourType ? INPUT_COLOUR_TYPE[inputColourType] : ""
  } ${className}`;
  // TODO: Fix arrows behaviour
  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="number"
        className={inputClass}
        value={isPlaceholderActive ? "" : value}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={internalPlaceholder}
      />
      {!isPlaceholderActive && (
        <div className={styles.arrows} ref={inputRef}>
          <div className={styles.upArrow}>
            <Image
              src="/icons/arrow-up.png"
              alt="Increment"
              width={24}
              height={24}
              onClick={incrementValue}
            />
          </div>
          <div className={styles.downArrow}>
            <Image
              src="/icons/arrow-down.png"
              alt="Decrement"
              width={24}
              height={24}
              onClick={decrementValue}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberInput;
