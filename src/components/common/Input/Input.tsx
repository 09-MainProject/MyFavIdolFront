import React from 'react';

type Props = {
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    label?: string;
    id?: string;
    variant?: 'outlined' | 'lined';
}

function Input({type = 'text', placeholder, value, onChange, name, id, variant, label}: Props) {
    const classNames = {
        outlined: 'w-full rounded border border-gray-300 px-3 py-2 text-sm',
        lined: 'mt-4 w-full border-b border-gray-200 p-3 text-sm outline-none'
    }[variant];

    return (
        <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-gray-700"
        >
            {label}
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} id={id}
                   className={`${classNames}`}/>
        </label>
    );
}

export default Input;