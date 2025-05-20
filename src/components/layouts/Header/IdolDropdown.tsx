import React from 'react';
import {Link} from 'react-router';
import Dropdown from '@components/common/Dropdown/Dropdown.tsx';
import IdolDropdownPanel from '@pages/schedule/IdolDropdownPanel.tsx';
import {Idol} from '@store/idolStore.ts';
import {IdolArtistsCard} from '@/types/idols';

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
    const idolArtistsCards: IdolArtistsCard[] = idols.map(idol => ({
        ...idol,
        idolId: idol.id,
        title: idol.name,
        img: idol.profile_image || '',
        type: '일정',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        location: '',
        enName: idol.en_name || '',
    }));

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
                    idols={idolArtistsCards}
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