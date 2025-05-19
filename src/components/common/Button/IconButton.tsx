import React from 'react';

type Props = {
    type?: 'submit' | 'reset' | 'button';
    onClick?: () => void;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function IconButton({type = 'button', children, onClick, ...props}: Props) {
    return (
        // eslint-disable-next-line react/button-has-type
        <button type={type} onClick={onClick} {...props}>
            {children}
        </button>
    );
}


export default IconButton;
