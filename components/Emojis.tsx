import styles from "./Emojis.module.scss";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
const Emojis =() => {
    return (
        <div>
           <Picker data={data} onEmojiSelect={console.log} />
        </div>
    );
};

export default Emojis;
