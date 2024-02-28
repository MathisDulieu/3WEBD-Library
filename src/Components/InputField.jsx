// InputField.jsx
import React from 'react';

function InputField({ value, onChange, placeholder }) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="p-2 border border-gray-300 rounded"
        />
    );
}

export default InputField;
