import React from 'react';
import MyTextarea from "../../UI/Textareas/MyTextarea.jsx";
import styles from './TemplateEditor.module.css'

const ImageEditor = ({block, labelTextChange}) => {

    return (
        <div>
            <div>
                <img src={block.src} alt={block.src} className={styles.img_elem}/>
            </div>
            <div style={{width: '600px'}}>
                <MyTextarea value={block.label} onChange={labelTextChange}/>
            </div>
        </div>
    );
};

export default ImageEditor;