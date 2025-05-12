import React from 'react';
import Textarea from "../../UI/Textareas/Textarea.jsx";
import styles from './TemplateEditor.module.css'

const ImageEditor = ({block, labelTextChange}) => {

    return (
        <div className={styles.image_element_wrapper}>
            <div>
                <img src={block.src} alt={block.src} className={styles.img_elem}/>
            </div>
            <div>
                <Textarea value={block.label} onChange={labelTextChange}/>
            </div>
        </div>
    );
};

export default ImageEditor;