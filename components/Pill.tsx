import { useState } from 'react';
import styles from './Pill.module.scss';

// Assuming these props are passed to your component
interface Props {
  colour: string;
  textColour?: string;
  shadow: boolean;
  boxShadow: string;
  child: React.ReactNode;
  hoverColour?: string; // Optional hover background color
  hoverTextColour?: string; // Optional hover text color
}

const MyComponent = ({ colour, textColour, shadow=false, boxShadow, child, hoverColour = '#14d6ff', hoverTextColour = '#ffffff' }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isHovered ? hoverColour : colour,
        cursor: 'pointer',
        color: isHovered ? hoverTextColour : textColour,
        boxShadow: shadow ? boxShadow : 'none',
        padding: '0.4rem 1rem',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {child}
    </div>
  );
};

export default MyComponent;