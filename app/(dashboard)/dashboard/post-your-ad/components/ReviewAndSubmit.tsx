import styles from "./ReviewAndSubmit.module.scss";

const SubmitForm = () => {
    // https://chatgpt.com/share/45cb30a0-a739-4224-bea5-82b0c352dd28
    return (
        <div className={styles.container}>
            <p className={styles.title}>Submit your ad</p>
            <p>Thank you for submitting your ad</p>
        </div>
    )
}

export default SubmitForm