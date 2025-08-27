
import styles from "./FormProgressBar.module.scss";

interface ProgressBarProps {
  currentStepIndex: number;
  totalSteps: number;
}

const FormProgressBar: React.FC<ProgressBarProps> = ({
  currentStepIndex,
  totalSteps,
}) => {
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${progressPercentage}%` }}
      />

    </div>
  );
};

export default FormProgressBar;
