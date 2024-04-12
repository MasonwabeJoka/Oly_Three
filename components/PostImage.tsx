import styles from './PostImage.module.scss'
import Image from 'next/image'


const PostImage = ({image}: {image: string}) => {
  return (
    <div className={styles.container}>
        <Image src={image} alt="Post Image" width={400} height={400}/>
    </div>
  )
}

export default PostImage