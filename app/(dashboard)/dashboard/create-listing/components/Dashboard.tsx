// import styles from "./Dashboard.module.scss";
// import SelectACategory from "./SelectACategory";
// import Details from "./Details";
// import Price from "./Price";
// import BankAccountDetails from "./BankAccountDetails";
// import TitleAndDescription from "./TitleAndDescription";
// import UploadMedia from "./UploadMedia";
// import Location from "./Location";
// import PromoteYourAds from "./PromoteYourAds";
// import Congratulations from "./ReviewListing";
// import ReviewAndSubmit from "./ReviewAndSubmit";
// import DashboardClient from "./DashboardClient";

// interface DashboardProps {
//   initialFormData: any;
//   goTo: () => void;
//   setCategory: (category: string) => void;
// }

// const Dashboard = ({ initialFormData, goTo, setCategory }: DashboardProps) => {
//   const onNext = () => {};
//   const steps = [
//     <SelectACategory key="0" />,
//     <Details key="1" onNext={onNext} />,
//     <Price key="2" onNext={onNext} />,
//     <BankAccountDetails key="3" onNext={onNext} />,
//     <TitleAndDescription key="4" onNext={onNext} />,
//     <UploadMedia key="5" onNext={onNext} />,
//     <Location key="6" onNext={onNext} />,
//     <PromoteYourAds key="7" onNext={onNext} />,
//     <Congratulations key="8" onNext={onNext} goTo={goTo} />,
//     <ReviewAndSubmit key="9" onNext={onNext} goTo={goTo} />,
//   ];

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         <DashboardClient initialFormData={initialFormData} steps={steps} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
