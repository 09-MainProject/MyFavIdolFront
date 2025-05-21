import React from 'react';

type Props = {
    icon: string;
    label: string;
    children: React.ReactNode;
};

function DetailInfoItem({icon, label, children}: Props) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-500">{icon}</div>
            <div>
                <h3 className="mb-1 text-sm font-medium text-gray-500">{label}</h3>
                <div className="text-gray-900">{children}</div>
            </div>
        </div>
    );
}

export default DetailInfoItem;