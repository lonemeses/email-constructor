import React from 'react';
import PropTypes from "prop-types";
import styles from './MyInput.module.css'

const Input = ({placeholder, value, onChange, id}) => {
    return (
        <div className={styles.input_container}>

            <input id={id} type="text" value={value} onChange={onChange}
                   className={styles.input} placeholder=" "/>
            <label htmlFor={id} className={styles.label}>{placeholder}</label>
        </div>

    );
};

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}

export default Input;