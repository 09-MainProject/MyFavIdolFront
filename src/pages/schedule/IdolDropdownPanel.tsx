import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router';
import { IdolArtistsCard } from '@/components/common/Card/IdolCardList';


type Props = {
    idols: IdolArtistsCard[];
    selectedIdolId: number | null;
    setSelectIdol: (idolId: number) => void;
    handleCloseDropdown: () => void;
    handleToggleDropdown: () => void;
};

function IdolDropdownPanel({
                               idols,
                               selectedIdolId,
                               setSelectIdol,
    handleCloseDropdown,
                               handleToggleDropdown,
}: Props) {
    const navigate = useNavigate();
    useEffect(() => { 
        
    }, [idols]);
    
    return (
        <div className="flex flex-col gap-1">
            {idols.map(idol => (
                <div key={idol.id}>
                    <button
                        type="button"
                        onClick={() => {
                            setSelectIdol(idol.id);
                            handleCloseDropdown();
                            handleToggleDropdown();
                            navigate(`/schedule/${idol.id}`);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2 ${
                            selectedIdolId === idol.id && 'bg-gray-100'
                        }`}
                    >
                        {idol.name}
                    </button>
                </div>
            ))}
            <div className="p-2 text-center">
                <Link to="/artists">추가 / 편집</Link>
            </div>
        </div>
    );
}

export default IdolDropdownPanel;
