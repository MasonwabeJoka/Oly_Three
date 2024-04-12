import React from 'react';
import styles from './RadioButton.module.scss';

type RadioButtonProps = {
    id: string;
    name: string;
    className?: string; // Make className optional
    label?: string;
    checked: boolean; // Controlled component: checked state is passed as a prop
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Controlled component: onChange handler is passed as a prop
};

const RadioButton = ({ id, name, className, label, checked, onChange }: RadioButtonProps): JSX.Element => {
    return (
        <div className={styles.radioButtonContainer}>
            <input 
              type="radio" 
              id={id} 
              name={name} 
              className={className || ''} // Use the passed className or default to an empty string
              checked={checked} // Use the checked prop
              onChange={onChange} // Use the onChange prop
              aria-label={label} // Accessibility enhancement
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default RadioButton;
