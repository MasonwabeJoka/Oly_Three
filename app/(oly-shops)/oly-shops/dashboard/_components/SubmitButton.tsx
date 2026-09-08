import { useFormStatus } from 'react-dom';
import styles from './SubmitButton.module.scss'
import Button from "@/components/Button";
import Link from 'next/link';

interface SubmitButtonProps {
  
}

const SubmitButton = ({}: SubmitButtonProps) => {
  const {pending} = useFormStatus()
  return (
    
    
    <Button
        buttonSize="medium"
        buttonVariant="normal"
        children={pending ? 'Submitting...': 'Add Product'}

        aria-label="Add Product Button"

        isDisabled={pending}
        type="submit"
      />
  );
};

export default SubmitButton;