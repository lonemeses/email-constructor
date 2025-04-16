import React from 'react';
import styles from './TemplatePreview.module.css'

const ImagePreview = ({ block }) => {

    return (
        <div>
            <div className={styles.image_content}>
                <img src={block.src} alt={block.src} className={styles.preview_img}/>
                <p>{block.label}</p>
            </div>
        </div>
    );
};

export default ImagePreview;