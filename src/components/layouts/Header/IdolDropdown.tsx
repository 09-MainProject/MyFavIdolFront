import React from 'react';
import {Link} from 'react-router';
import Dropdown from '@components/common/Dropdown/Dropdown.tsx';
import IdolDropdownPanel from '@pages/schedule/IdolDropdownPanel.tsx';
import {Idol} from '@store/idolStore.ts';

type Props = {
    idols: Idol[];
    dropdownOpen: boolean;
    handleToggleDropdown: () => void;
    displayedIdolName: string;
    selectedIdolId: number | null;
    setSelectIdol: (idolId: number) => void;
    handleCloseDropdown: () => void;
};

function IdolDropdown({
                          idols,
                          dropdownOpen,
                          handleToggleDropdown,
                          displayedIdolName,
                          setSelectIdol,
                          selectedIdolId,
                          handleCloseDropdown,
                          
                      }: Props) {
    return (
        <div className="relative flex items-center gap-4">
            <Link to="/">
                <h1 className="pb-2 text-3xl leading-none font-bold">Wistar</h1>
            </Link>
            <Dropdown
                dropdownOpen={dropdownOpen}
                handleToggleDropdown={handleToggleDropdown}
                displayedIdolName={displayedIdolName}
                mode="header"
            >
                <IdolDropdownPanel
                    idols={idols}
                    selectedIdolId={selectedIdolId}
                    setSelectIdol={setSelectIdol}
                    handleCloseDropdown={handleCloseDropdown}
                    handleToggleDropdown={handleToggleDropdown}
                />
            </Dropdown>
        </div>
    );
}

export default IdolDropdown;