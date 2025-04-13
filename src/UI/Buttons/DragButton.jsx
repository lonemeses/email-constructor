import React from 'react';
import { MdDragIndicator } from "react-icons/md";
import styles from "./MyButtons.module.css"
const DragButton = (props) => {
    return (
        <div {...props} className={styles.drag_btn}>
            <MdDragIndicator/>
        </div>
    );
};

export default DragButton;