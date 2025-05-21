import React, {useRef, useState} from 'react';
import useOutsideClick from '@hooks/useOutsideClick.tsx';


import IdolDropdownPanel from '@pages/schedule/IdolDropdownPanel';
import {Idol} from '@store/idolStore';


type Props = {
    idols: Idol[];
    setSelectIdol: (id: number) => void;
    selectedIdolId: number;
    displayedIdolName: string;
};

function IdolDropdown({
                          idols,
                          setSelectIdol,
                          selectedIdolId,
                          displayedIdolName
                      }: Props) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useOutsideClick(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

    const handleToggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const handleCloseDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <div className="relative w-[200px]" ref={dropdownRef}>
            <button
                type="button"
                onClick={handleToggleDropdown}
                className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
            >
                <span className="truncate">{displayedIdolName}</span>
                <span className="ml-2">▼</span>
            </button>
            {dropdownOpen && (
                <div
                    className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    <IdolDropdownPanel
                        idols={idols}
                        selectedIdolId={selectedIdolId}
                        setSelectIdol={setSelectIdol}
                        handleCloseDropdown={handleCloseDropdown}
                        handleToggleDropdown={handleToggleDropdown}
                    />
                </div>
            )}
        </div>
    );
}

export default React.memo(IdolDropdown);