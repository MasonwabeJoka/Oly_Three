import { useFormStatus } from 'react-dom';
import styles from './SubmitButton.module.scss'
import Button from "@/components/Buttons";
import Link from 'next/link';

interface SubmitButtonProps {
  
}

const SubmitButton = ({}: SubmitButtonProps) => {
  const {pending} = useFormStatus()
  return (
    
    
    <Button
        buttonSize="medium"
        buttonType="normal"
        buttonChildren={pending ? 'Submitting...': 'Add Product'}
        name="add-product-btn"
        aria-label="Add Product Button"
        autoFocus={false}
        disabled={pending}
        type="submit"
      />
  );
};

export default SubmitButton;