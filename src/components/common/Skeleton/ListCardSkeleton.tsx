import React from 'react';
import ListSkeleton from '@components/common/Skeleton/ListSkeleton.tsx';

type Props = {
    num: number;
}

function ListCardSkeleton({num}: Props) {
    return (
        <div
            className="mt-12 flex flex-col items-center gap-10 px-4 ">
            {Array.from({length: num}).map((_, i) => (
                <ListSkeleton key={`skeleton-${i + 1}`}/>
            ))}
        </div>
    );
}

export default ListCardSkeleton;