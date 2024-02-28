// SelectField.jsx
import React from 'react';

function SelectField({ value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="p-2 border border-gray-300 rounded"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

export default SelectField;
