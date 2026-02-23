import styles from "./ListCard.module.scss";
interface ListCardProps {
    content: React.ReactNode;
}

const ListCard = ({content}: ListCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default ListCard;
