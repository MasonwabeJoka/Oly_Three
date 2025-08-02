'use client';
import { useCallback } from 'react';
import styles from './BusinessAddressForm.module.scss';
import Input from '@/components/Input';
import Select from '@/components/Select';
import useIsSelectOpen from '../../store/useIsSelectOpen';
import { useFormContext } from 'react-hook-form';

const BusinessAddressForm: React.FC = () => {
  const { isSelectOpen, setIsSelectOpen } = useIsSelectOpen();
  const { register, formState: { errors } } = useFormContext();

  const handleSelectOpenChange = useCallback((isOpen: boolean) => {
    setIsSelectOpen(isOpen);
  }, [setIsSelectOpen]);

  const provinces = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Western Cape',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <Input
          className={styles.streetAddress}
          inputType="text"
          inputSize="large"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="Street Address"
          id="street"
          name="street"
          placeholder="Enter Street Address"
          ariaLabel="Street Address"
          required
          dashboard
          {...register('street')}
        />
        {errors.street && <p className={styles.error}>{errors.street.message}</p>}
      </div>
      <div className={styles.formGroup}>
        <Input
          className={styles.suburb}
          inputType="text"
          inputSize="large"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="Suburb"
          id="suburb"
          name="suburb"
          placeholder="Enter Suburb"
          ariaLabel="Suburb"
          required
          dashboard
          {...register('suburb')}
        />
        {errors.suburb && <p className={styles.error}>{errors.suburb.message}</p>}
      </div>
      <div className={styles.formGroup}>
        <Input
          className={styles.city}
          inputType="text"
          inputSize="large"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="City"
          id="city"
          name="city"
          placeholder="Enter City"
          ariaLabel="City"
          required
          dashboard
          {...register('city')}
        />
        {errors.city && <p className={styles.error}>{errors.city.message}</p>}
      </div>
      <div className={styles.formGroup}>
        <Select
          options={provinces}
          className={styles.province}
          initialValue="Select Province"
          selectSize="large"
          selectColourType="normal"
          label="Province"
          id="province"
          name="province"
          ariaLabel="Province"
          dashboard
          required
          onChange={(e) => register('province').onChange(e)}
          onOpenChange={handleSelectOpenChange}
        />
        {errors.province && <p className={styles.error}>{errors.province.message}</p>}
      </div>
      {!isSelectOpen && (
        <div className={styles.formGroup}>
          <Input
            className={styles.postalCode}
            inputType="text"
            inputSize="large"
            iconPosition="right"
            iconWidth={32}
            iconHeight={32}
            label="Postal Code"
            id="postalCode"
            name="postalCode"
            placeholder="Enter Your Postal Code"
            ariaLabel="Postal Code"
            required
            dashboard
            {...register('postalCode')}
          />
          {errors.postalCode && <p className={styles.error}>{errors.postalCode.message}</p>}
        </div>
      )}
    </div>
  );
};

export default BusinessAddressForm;