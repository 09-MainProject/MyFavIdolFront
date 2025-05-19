import {ReactNode} from 'react';

interface Props {
    children: ReactNode;
    mode?: 'post';
}

function CardFrame({children, mode}: Props) {
    return (
        <div className={`rounded-xl bg-white ${mode ? '' : 'duration-300 shadow transition-shadow hover:shadow-lg'} `}>
            {children}
        </div>
    );
}

export default CardFrame;
