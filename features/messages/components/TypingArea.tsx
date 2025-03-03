"use client";
import styles from "./TypingArea.module.scss";
import { useState, useEffect, useRef } from "react";
import TextArea from "@/components/TextArea";
import Icon from "@/components/Icon";
import { sendMessage, isTyping } from "react-chat-engine";
import Button from "@/components/Buttons";
import Input from "@/components/Input";

const TypingArea = (props) => {
  const [value, setValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const mirrorDivRef = useRef<HTMLDivElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const { creds, chatId } = props;

  // We use the height of the MirrorDivRef div to control the height of the text area
  useEffect(() => {
    if (mirrorDivRef.current) {
      // Reset to auto to shrink element as text reduces
      mirrorDivRef.current.style.height = "auto";

      let scHeight = mirrorDivRef.current.scrollHeight;
      setTextareaHeight(`${scHeight}px`);
    }
  }, [value]);

  const messageSend = (event: any) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) sendMessage(creds, chatId, { text });

    // clear input field
    setValue("");
  };

  const handleTextChange = (event: any) => {
    setValue(event.target.value);
    // isTyping(props, chatId);
  };

  const upload = (fileType: string, event: any) => {
    if (fileType === "video") videoInputRef.current?.click();
    if (fileType === "photo") photoInputRef.current?.click();
    sendMessage(creds, chatId, { files: event.target.files, text: "" });
  };

  return (
    <form className={styles.typingArea} onSubmit={messageSend}>
      <div className={styles.icons}>
        <div className={styles.icon} onClick={handleTextChange}>
          <input
            type="file"
            ref={videoInputRef}
            className={styles.videoInput}
            onChange={(e) => upload("video", e)}
            hidden
          />
          <Button
            className={`${styles.uploadVideos} ${styles.button}`}
            buttonChildren={
              <Icon
                className={styles.videosIcon}
                src="/icons/video.svg"
                alt="Video Icon"
                width={32}
                height={32}
              />
            }
            buttonType="roundStandardFeed"
            buttonSize=""
            name="upload-videos-btn"
            type="button"
            ariaLabel="Upload Videos Button"
            autoFocus={false}
            disabled={false}
            ariaHidden={false}
          />
        </div>
        <div className={styles.icon}>
          <input
            type="file"
            ref={photoInputRef}
            className={styles.photoInput}
            hidden
            onChange={(e) => upload("photo", e)}
          />
          <Button
            className={`${styles.uploadImageIcon} ${styles.button}`}
            buttonChildren={
              <Icon
                className={styles.images}
                src="/icons/image.svg"
                alt="Image Icon"
                width={32}
                height={32}
              />
            }
            buttonType="roundStandardFeed"
            buttonSize=""
            name="upload-images-btn"
            type="button"
            ariaLabel="Upload Images Button"
            autoFocus={false}
            disabled={false}
            ariaHidden={false}
          />
        </div>
        <div className={styles.icon}>
          <Button
            className={`${styles.voiceNote} ${styles.button}`}
            buttonChildren={
              <Icon
                className={styles.voiceNoteIcon}
                src="/icons/microphone.svg"
                alt="Voice Note Icon"
                width={32}
                height={32}
              />
            }
            buttonType="roundStandardFeed"
            buttonSize=""
            name="voice-note-btn"
            type="button"
            ariaLabel="Voice Note Button"
            autoFocus={false}
            disabled={false}
          />
        </div>
      </div>
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

        <Button
          className={styles.emojiButton}
          buttonChildren={
            <Icon
              className={styles.emojiIcon}
              src="/icons/emoji.svg"
              alt="Emoji Icon"
              width={40}
              height={40}
            />
          }
          buttonType="icon"
          buttonSize=""
          name="emoji-btn"
          type="button"
          ariaLabel="Emoji Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
        />

        {/* <div className={styles.send}> */}
        <Button
          className={styles.sendButton}
          buttonChildren={
            <Icon
              className={styles.sendIcon}
              src="/icons/send.svg"
              alt="Send Icon"
              width={24}
              height={24}
            />
          }
          buttonType="icon"
          buttonSize=""
          name="send-btn"
          type="submit"
          ariaLabel="Send Button"
          autoFocus={false}
          disabled={false}
          ariaHidden={false}
        />
        {/* </div> */}
      </div>
    </form>
  );
};

export default TypingArea;
