import React, {useRef} from 'react';
import styles from "./MyTextarea.module.css"
const MyTextarea = (props) => {
    const ref = useRef(null);
    const autoResize = () => {
        ref.current.style.height = "auto";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
    }

    return (
        <textarea ref={ref} className={styles.textarea} onInput={autoResize} {...props} value={props.value} onChange={e => props.onChange(e.currentTarget.value)} />
    );
};

export default MyTextarea;