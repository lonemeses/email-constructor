import React from 'react';
import styles from './SideBar.module.css'
import TextPreview from "../TemplatePreview/TextPreview.jsx";

const TemplateCard = ({template, onClick}) => {
    return (
        <div className={styles.card} onClick={() => onClick(template)}>
            <div className={styles.card_preview_wrapper}>
                <div className={styles.card_preview_content}>
                    {template.template.map(block => (
                        <div key={block.id} className={styles.block}>
                            {block.type === 'text' && <TextPreview value={block.text}/>}
                            {block.type === 'image' && <img className={styles.block_img} src={block.src} alt="preview"/>}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.card_footer}>
                <p className={styles.card_title}>{template.name}</p>
            </div>
        </div>
    );
};

export default TemplateCard;