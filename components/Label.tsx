import styles from './Label.module.scss'
interface LabelProps {
    text: string;
}

const Label = ({text}:LabelProps) => {
    return (
        <div className={styles.label}>
            <div>{text}</div>
        </div>
    )
}

export default Label