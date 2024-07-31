import Input from "@/components/Input";
import styles from "./Footer.module.scss";
import Buttons from "@/components/Buttons";
import { UIData } from "@/data/UIData";
const Footer = () => {
  const { largeDesktop, icon, email } = UIData;
  return (
    <footer className={styles.container}>
      <aside className={styles.newsLetter}>
        <Input
          legend="Sign up to receive free updates"
          label="Email"
          className={styles.formInput}
          inputType={email}
          inputSize={largeDesktop}
          placeholder="Email"
          autoComplete="on"
          autoFocus={false}
          id="email"
          name="email"
          ariaLabel="Email input"
          required={true}
        />
      </aside>
      <main className={styles.mainSection}>
        <div className={`${styles.footerSections} ${styles.contactsSection} `}>
          <div className={styles.contacts}>
            <div className={`${styles.contact} ${styles.phoneNumber}`}>
              <div className={styles.icon}>icon</div>
              <p>(011) 123 4567</p>
            </div>
            <div className={`${styles.contact} ${styles.address}`}>
              <div className={styles.icon}>icon</div>
              <p>5th Office Good Building, Sandton, Johannesburg</p>
            </div>
            <div className={`${styles.contact} ${styles.email}`}>
              <div className={styles.icon}>icon</div>
              <p>support@oly.com</p>
            </div>
          </div>
          <div className={styles.socials}>
            <div className={styles.facebook}>
              <Buttons
                buttonType={icon}
                buttonChildren="Facebook"
                buttonSize=""
                name="Facebook Icon"
                type="button"
                ariaLabel="Facebook Icon"
                autoFocus={false}
                disabled={false}
              />
            </div>
            <div className={styles.instagram}>
              <Buttons
                buttonType={icon}
                buttonChildren="Instagram"
                buttonSize=""
                name="Instagram Icon"
                type="button"
                ariaLabel="Instagram Icon"
                autoFocus={false}
                disabled={false}
              />
            </div>
            <div className={styles.twitter}>
              <Buttons
                buttonType={icon}
                buttonChildren="Twitter"
                buttonSize=""
                name="Twitter Icon"
                type="button"
                ariaLabel="Twitter Icon"
                autoFocus={false}
                disabled={false}
              />
            </div>
            <div className={styles.youtube}>
              <Buttons
                buttonType={icon}
                buttonChildren="YouTube"
                buttonSize=""
                name="YouTube Icon"
                type="button"
                ariaLabel="YouTube Icon"
                autoFocus={false}
                disabled={false}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.footerSections} ${styles.sectionOne}`}>
          <p>About</p>
          <p>Contact Us</p>
          <p>Our Team</p>
          <p>Blog</p>
          <p>Forum</p>
        </div>
        <div className={`${styles.footerSections} ${styles.sectionTwo}`}>
          <p>Community</p>
          <p>Jobs</p>
          <p>Vehicles</p>
          <p>Services</p>
          <p>Real Estate</p>
        </div>
        <div className={`${styles.footerSections} ${styles.sectionThree}`}>
          <p>About</p>
          <p>Contact Us</p>
          <p>Our Team</p>
          <p>Blog</p>
          <p>Forum</p>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
