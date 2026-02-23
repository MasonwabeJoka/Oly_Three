'use client';
import styles from './EnterBusinessDetails.module.scss';
import Input from '@/components/Input';
import BusinessAddressForm from './BusinessAddressForm';
import { useFormContext } from 'react-hook-form';
import Button from '@/components/Buttons';

interface EnterBusinessDetailsProps {
  onNext: () => void;
}

const EnterBusinessDetails: React.FC<EnterBusinessDetailsProps> = ({ onNext }) => {
  const { register, formState: { errors }, trigger } = useFormContext();

  const handleSubmit = async () => {
    const isValid = await trigger(['businessName', 'regNumber', 'taxNumber', 'street', 'suburb', 'city', 'province', 'postalCode']);
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Input
          className={styles.businessName}
          inputType="text"
          inputSize="large"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="Business Name"
          id="businessName"
          placeholder="Enter Your Business Name"
          ariaLabel="Business Name"
          required
          dashboard
          {...register('businessName')}
        />
        {errors.businessName && <p className={styles.error}>{String(errors.businessName.message || '')}</p>}
        <Input
          className={styles.registrationNumber}
          inputType="text"
          inputSize="large"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="Registration Number"
          id="regNumber"
          placeholder="Enter Your Business Registration Number"
          ariaLabel="Registration Number"
          required
          dashboard
          {...register('regNumber')}
        />
        {errors.regNumber && <p className={styles.error}>{String(errors.regNumber.message || '')}</p>}
        <Input
          className={styles.taxNumber}
          inputType="text"
          inputSize="large"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="Tax Number"
          id="taxNumber"
          placeholder="Enter Your Business Tax Number"
          ariaLabel="Tax Number"
          required
          dashboard
          {...register('taxNumber')}
        />
        {errors.taxNumber && <p className={styles.error}>{String(errors.taxNumber.message || '')}</p>}
        <BusinessAddressForm />
        <Button
          className={styles.button}
          buttonChildren="Submit"
          buttonType="primary"
          buttonSize="large"
          name="submit-btn"
          type="button"
          ariaLabel="Submit Business Details"
          autoFocus={false}
          disabled={!!errors.businessName || !!errors.regNumber || !!errors.taxNumber || !!errors.street || !!errors.suburb || !!errors.city || !!errors.province || !!errors.postalCode}
          dashboard
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EnterBusinessDetails;