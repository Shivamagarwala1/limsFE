import React from 'react';

const CustomNormalInputField = ({ type = "text", name, id, value, placeholder, onChange, label }) => {
    return (

        <div className="relative flex-1">
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}

                placeholder={placeholder}
                className={`inputPeerField peer border-borderColor focus:outline-none`}
            />
            <label htmlFor={id} className="menuPeerLevel">
                {label}
            </label>
        </div>
    );
};

export default CustomNormalInputField;
