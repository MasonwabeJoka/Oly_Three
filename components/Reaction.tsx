import styles from "./Reaction.module.scss";
import Button from "./Button";
import Image from "@/components/Image";

interface CommentReactionProps {
  icon: string;
  label: string;
  showLabel?: boolean;
}

const Reaction = ({ icon, label, showLabel = false }: CommentReactionProps) => {
  return (
    <Button
      className={styles.container}
      children={
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <Image src={icon} alt={label} width={25} height={25} />
          {showLabel && <span className={styles.label}>{label}</span>}
        </div>
      }
      buttonVariant="icon"



      ariaLabel="Comment Reaction Button"


    />
  );
};

export default Reaction;
