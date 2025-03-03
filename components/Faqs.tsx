"use client";
import { useState } from "react";
import styles from "./Faqs.module.scss";

interface Props {
  question: string;
  answer: string;
}

const FAQs: React.FC<{ faqs: Props[] }> = ({ faqs }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // const openFaq = (index: number) => {
  //   setOpenFaqIndex(index);
  // };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {faqs.map((faq: Props, index: number) => (
          <div
            key={index}
            className={styles.questionAndAnswer}
            onMouseEnter={() => toggleFaq(index)}
            onClick={() => toggleFaq(index)}
          >
            <div className={styles.questionContainer}>
              <div className={styles.question}>{faq.question}</div>
            </div>
            {openFaqIndex === index && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
