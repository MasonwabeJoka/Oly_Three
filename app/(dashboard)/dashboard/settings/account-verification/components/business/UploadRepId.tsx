'use client';
import styles from './UploadRepId.module.scss';
import UploadButton from '@/components/UploadButton';
import { useFormContext } from 'react-hook-form';

interface UploadRepIdProps {
  onNext: () => void;
}

const UploadRepId: React.FC<UploadRepIdProps> = ({ onNext }) => {
  const { setValue, formState: { errors }, trigger } = useFormContext();

  const handleFileChange = async (file: File) => {
    setValue('repIdFile', file, { shouldValidate: true });
    await trigger('repIdFile');
    if (!errors.repIdFile) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Upload a clear image of your business representative's government-issued ID (passport, national ID, or driver’s license). Ensure the document is fully visible, readable, and not expired.
      </p>
      <div className={styles.uploadContainer}>
        <UploadButton
          mediaType="photo"
          colour="primary"
          required
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
      </div>
      {errors.repIdFile && <p className={styles.error}>{errors.repIdFile.message}</p>}
    </div>
  );
};

export default UploadRepId;