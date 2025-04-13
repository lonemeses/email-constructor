import React from 'react';
import styles from './SideBar.module.css'
import TemplateCard from "./TemplateCard.jsx";

const SideBar = ({active, onClick, templates}) => {
    return (
        <div className={active ? styles.side_wrapper_active : styles.side_wrapper}>
            <div className={styles.side_content}>
                <div className={styles.side_title}>
                    Ваши шаблоны
                </div>
                <div className={styles.side_list}>
                    {templates.map(template =>
                        <TemplateCard template={template} onClick={onClick} key={template.id}/>
                    )}
                </div>
                <div style={{height: "80px", opacity: 0, pointerEvents: 'none'}}/>
            </div>

        </div>
    );
};

export default SideBar;