import styles from './MoreFromOly.module.scss'
import ClassifiedLink from './cards/ClassifiedLink'
import { classifieds } from '../data/classifiedLinks'

const MoreFromOly = () => {
  return (
    <div className={styles.container}>

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