import styles from './MoreFromOly.module.scss'
import ClassifiedLink from './cards/ClassifiedLink'
import { classifieds } from '../data/classifiedLinks'

const MoreFromOly = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>More From Oly</h2>
      <div className={styles.classifieds}>
        {classifieds.map((classified) => (
          <ClassifiedLink
            key={classified.id}
            text={classified.text}
            image={classified.image}
          />
        ))}
      </div>
    </div>
  )
}

export default MoreFromOly