import styles from './ReviewTitleAndDescription.module.scss';
import { SectionWrapper } from './SectionWrapper';

const ReviewTitleAndDescription = () => {
  return (
    <SectionWrapper title="Title and Description"><div className={styles.container}>
    <div className={styles.contentContainer}>
      <div className={styles.content}>
        <div className={styles.contentLabel}>Listing Title</div>
        <div className={styles.contentItem}>Lorem ipsum odor amet, consectetuer adipiscing elit.</div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentLabel}>Listing Description</div>
        <div className={styles.contentItem}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis repellendus alias minus saepe, officia fuga eligendi ratione eaque sunt iure consectetur optio sed debitis eum quibusdam dolores atque cupiditate explicabo. Rem eos et perferendis magni autem sit cumque, animi saepe eveniet, temporibus commodi dicta laborum ullam. Voluptatum beatae maiores tenetur vitae. Modi libero fugit nostrum voluptas maiores sint, possimus deleniti repellat deserunt facere natus accusantium. Vel harum voluptates amet officiis nostrum aperiam cumque ducimus error odio laudantium. Eos, ab et.</div>
      </div>
    </div>
  </div></SectionWrapper>
  )
}

export default ReviewTitleAndDescription