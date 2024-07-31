"use client";
import styles from "./FeedbackForm.module.scss";
import { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Buttons";
import TextArea from "./TextArea";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1 className={styles.title}>Feedback</h1>
      <div className={`${styles.nameContainer} ${styles.control}`}>
        <Input
          legend=""
          label="Name"
          className={styles.name}
          inputType="text"
          inputSize="large"
          placeholder="Please enter your name"
          autoComplete="off"
          autoFocus={false}
          id="name"
          name="name"
          ariaLabel="Name Field"
          required={true}
        />
      </div>
      <div className={`${styles.emailContainer} ${styles.control}`}>
        <Input
          legend=""
          label="Email"
          className={styles.email}
          inputType="email"
          inputSize="large"
          placeholder="Please enter your email"
          autoComplete="off"
          autoFocus={false}
          id="email"
          name="email"
          ariaLabel="Email Field"
          required={true}
        />
      </div>
      <div className={`${styles.messageContainer} ${styles.control}`}>
        <TextArea
          className={styles.message}
          placeholder=""
          label="Message"
          id="message"
          name="message"
          size="large"
          required={true}
          onChange={() => {}}
          onSubmit={() => {}}
          style={{
            padding: "2rem 2rem",
            height: "15rem",
            textAlign: "left",
          }}
        />
      </div>
      <div className={`${styles.submitButtonContainer} ${styles.control}`}>
        <Button
          className={styles.submitButton}
          buttonChildren="Submit"
          buttonType="normal"
          buttonSize="large"
          name="submit-btn"
          type="button"
          ariaLabel="Submit Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
    </form>
  );
};

export default FeedbackForm;
