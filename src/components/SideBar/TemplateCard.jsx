import React from 'react';
import styles from './SideBar.module.css'

const TemplateCard = ({template, onClick}) => {
    return (
        <div className={styles.card} onClick={() => onClick(template)}>
            <div className={styles.previewWrapper}>
                <div className={styles.previewContent}>
                    {template.data.map(block => (
                        <div key={block.id} className={styles.block}>
                            {block.type === 'text' && <p className={styles.block_p}>{block.text}</p>}
                            {block.type === 'image' && <img className={styles.block_img} src={block.src} alt="preview"/>}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.cardFooter}>
                <p className={styles.cardTitle}>{template.name}</p>
            </div>
        </div>
    );
};

export default TemplateCard;