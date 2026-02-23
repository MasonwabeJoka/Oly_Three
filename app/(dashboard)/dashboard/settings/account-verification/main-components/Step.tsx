'use client';
import React from 'react';
import styles from './Step.module.scss';
import Button from '@/components/Buttons';
import useIsSelectOpen from '../store/useIsSelectOpen';

interface StepType {
  title: string;
  content: JSX.Element;
}

interface StepProps {
  step: StepType;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

const Step: React.FC<StepProps> = ({ step, onNext, onBack, isLastStep }) => {
  const { isSelectOpen } = useIsSelectOpen();

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>{!isLastStep ? step.title : ''}</h1>
        <div className={styles.content}>{step.content}</div>
        {!isSelectOpen && (
          <div className={styles.buttons}>
            {!isLastStep && (
              <Button
                className={styles.proceedButton}
                buttonChildren="Proceed"
                buttonType="primary"
                buttonSize="large"
                name="proceed-btn"
                type="button"
                ariaLabel="Proceed Button"
                autoFocus={false}
                disabled={false}
                dashboard
                onClick={onNext}
              />
            )}
            <Button
              className={styles.backButton}
              buttonChildren="Back"
              buttonType="normal"
              buttonSize="large"
              name="back-btn"
              type="button"
              ariaLabel="Back Button"
              autoFocus={false}
              disabled={false}
              dashboard
              onClick={onBack}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Step;