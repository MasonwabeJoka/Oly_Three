import styles from "./Reaction.module.scss";
import Button from "./Buttons";
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
      buttonChildren={
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Image src={icon} alt={label} width={25} height={25} />
          {showLabel && <span className={styles.label}>{label}</span>}
        </div>
      }
      buttonType="icon"
      buttonSize=""
      name="comment-reaction-btn"
      type="button"
      ariaLabel="Comment Reaction Button"
      autoFocus={false}
      disabled={false}
    />
  );
};

export default Reaction;
