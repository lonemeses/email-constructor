import React from 'react';
import styles from "./MyButtons.module.css";
import {LuHeading1, LuHeading2} from "react-icons/lu";
import { FaParagraph } from "react-icons/fa6";

const TextButtons = ({addFunc}) => {
    const addTextBlock = (type) => {
        const initialSlateValue = [
            {
                type: type,
                children: [{ text: 'Пример текста' }]
            },
        ];
        addFunc(prev => [
            ...prev,
            {
                type: 'text',
                text: initialSlateValue,
                id: prev.length + 1
            }
        ]);

    }
    return (
        <div className={`${styles.fab_btn} ${styles.text_btn}`}>
            <LuHeading1 onClick={() => addTextBlock('heading-one')} className={styles.text_btn_icon}/>
            <LuHeading2 onClick={() => addTextBlock('heading-two')} className={styles.text_btn_icon}/>
            <FaParagraph onClick={() => addTextBlock('paragraph')}/>
        </div>
    );
};

export default TextButtons;