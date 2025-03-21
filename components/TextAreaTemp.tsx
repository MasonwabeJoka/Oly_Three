"use client";
import styles from './TextAreaTemp.module.scss';
import { useState, useEffect, useRef } from "react";
import TextArea from "@/components/TextArea";

const TextAreaTemp= (props) => {
  const [value, setValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const mirrorDivRef = useRef<HTMLDivElement>(null);

  // We use the height of the MirrorDivRef div to control the height of the text area
  useEffect(() => {
    if (mirrorDivRef.current) {
      // Reset to auto to shrink element as text reduces
      mirrorDivRef.current.style.height = "auto";

      let scrollHeight = mirrorDivRef.current.scrollHeight;
      setTextareaHeight(`${scrollHeight + 32}px`);
    }
  }, [value]);

  
  const handleTextChange = (event: any) => {
    setValue(event.target.value);
  
  };

  return (
    <form className={styles.typingArea}>
      
      <div className={styles.textInputContainer}>
        <TextArea
          className={styles.inputArea}
          placeholder=""
          label="inputArea"
          id="input-area"
          name="input-area"
          size="large"
          required={true}
          value={value}
          onChange={handleTextChange}
          style={{ height: textareaHeight }}
        />

        <div
          className={styles.inputArea}
          ref={mirrorDivRef}
          style={{
            height: textareaHeight,
            visibility: "hidden",
            position: "absolute",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            zIndex: -1, // To ensure it does not interfere with layout
          }}
        >
          {value}
        </div>
      </div>
    </form>
  );
};

export default TextAreaTemp;
