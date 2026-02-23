'use client';
import styles from './UploadID.module.scss';
import UploadButton from '@/components/UploadButton';
import { useFormContext } from 'react-hook-form';

interface UploadIdProps {
  onNext: () => void | Promise<void>;
}

const UploadId: React.FC<UploadIdProps> = ({ onNext }) => {
  const { setValue, formState: { errors }, trigger } = useFormContext();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('idFile', file, { shouldValidate: true });
      await trigger('idFile');
      if (!errors.idFile) {
        onNext();
      }
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Upload a clear image of your national ID, passport, or driver's license. Make sure the document is fully visible (with no cropped edges), the text is clear and readable, and the document is not expired.
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
      {errors.idFile && <p className={styles.error}>{String(errors.idFile.message || '')}</p>}
    </div>
  );
};

export default UploadId;