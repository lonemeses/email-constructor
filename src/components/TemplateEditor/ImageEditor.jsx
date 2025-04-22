import React from 'react';
import Textarea from "../../UI/Textareas/Textarea.jsx";
import styles from './TemplateEditor.module.css'

const ImageEditor = ({block, labelTextChange}) => {

    return (
        <div>
            <div>
                <img src={block.src} alt={block.src} className={styles.img_elem}/>
            </div>
            <div style={{width: '600px'}}>
                <Textarea value={block.label} onChange={labelTextChange}/>
            </div>
        </div>
    );
};

export default ImageEditor;