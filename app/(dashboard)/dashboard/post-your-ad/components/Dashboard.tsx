import styles from "./Dashboard.module.scss";
import SelectACategory from "./SelectACategory";
import Details from "./Details";
import Price from "./Price";
import BankAccountDetails from "./BankAccountDetails";
import TitleAndDescription from "./TitleAndDescription";
import UploadMedia from "./UploadMedia";
import Location from "./Location";
import PromoteYourAd from "./PromoteYourAd";
import Congratulations from "./Congratulations";
import ReviewAndSubmit from "./ReviewAndSubmit";
import DashboardClient from "./DashboardClient";



const Dashboard = ({ initialFormData, goTo, setCategory }) => {
  const steps = [
    <SelectACategory key="0" goTo={goTo} setCategory={setCategory} />,
    <Details key="1" />,
    <Price key="2" />,
    <BankAccountDetails key="3" />,
    <TitleAndDescription key="4" />,
    <UploadMedia key="5" />,
    <Location key="6" />,
    <PromoteYourAd key="7" />,
    <Congratulations key="8" />,
    <ReviewAndSubmit key="9" />,
  ];

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <DashboardClient initialFormData={initialFormData} steps={steps} />
      </div>
    </div>
  );
};

export default Dashboard;