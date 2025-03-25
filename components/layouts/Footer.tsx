"use client";
import Input from "@/components/Input";
import styles from "./Footer.module.scss";
import Button from "@/components/Buttons";
import FeedbackForm from "@/components/FeedbackForm";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";
import FeedbackOptions from "../FeedbackOptions";

const Footer = () => {
  const pathname = usePathname();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const openModal = () => {
    setShowFeedbackModal(true);
  };
  return (
    <footer
      className={
        pathname === "/listing" ? styles.listingContainer : styles.container
      }
    >
      <div
        className={pathname === "/listing" ? styles.listingMain : styles.main}
      >
        <div className={styles.newsLetter}>
          <Button
            className={styles.feedbackButton}
            buttonChildren="Please give us your feedback"
            buttonType="primary"
            buttonSize="large"
            name="feedback-btn"
            type="button"
            ariaLabel="Open Feedback Form"
            onClick={openModal}
            autoFocus={false}
            disabled={false}
          />
          <Modal
            showModal={showFeedbackModal}
            setShowModal={setShowFeedbackModal}
            modalContent={<FeedbackOptions />}
          />
    
        </div>
        <div className={styles.socials}>
          <Link
            href="https://www.facebook.com/OfficialOlyMarketplace"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.facebook}
          >
            <Icon
              className={styles.facebookIcon}
              src="/icons/social-media/facebook.png"
              alt="Facebook Icon"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://www.instagram.com/olymarketplace/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
          >
            <Icon
              className={styles.instagramIcon}
              src="/icons/social-media/instagram.png"
              alt="Instagram Icon"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://twitter.com/OlyMarketplace"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.twitter}
          >
            <Icon
              className={styles.xIcon}
              src="/icons/social-media/twitter.png"
              alt="X Icon"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCOsiKRPRL_IJGQYNxUdVqBw"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtube}
          >
            <Icon
              className={styles.youTubeIcon}
              src="/icons/social-media/youtube.png"
              alt="YouTube Icon"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div className={styles.copyright}>
          <p>© OLY 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
