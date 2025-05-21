import React from 'react';
import {Link, useNavigate} from 'react-router';
import {useAuthStore} from '@store/authStore';
import PerformToast from '@utils/PerformToast';

type Props = {
    idols: Array<{
        id: number;
        name: string;
        img: string;
    }>;
    selectedIdolId: number | null;
    setSelectIdol: (id: number) => void;
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
    const {login} = useAuthStore();

    const handleIdolSelect = (id: number) => {
        if (!login) {
            PerformToast({msg: '로그인이 필요한 서비스입니다.', type: 'warning'});
            return;
        }
        setSelectIdol(id);
        handleCloseDropdown();
        handleToggleDropdown();
        navigate('/schedule');
    };

    if (!login) {
        return (
            <div className="p-4 text-center">
                <p className="mb-2 text-sm text-gray-500">로그인이 필요한 서비스입니다</p>
                <Link
                    to="/login"
                    className="inline-block rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                    로그인하기
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            {idols.length > 0 ? (
                idols.map(idol => (
                    <button
                        key={idol.id}
                        type="button"
                        onClick={() => {
                            handleIdolSelect(idol.id);
                            navigate('/schedule');
                        }}
                        className={`flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-50 ${
                            selectedIdolId === idol.id ? 'bg-gray-50' : ''
                        }`}
                    >
                        <span>{idol.name}</span>
                    </button>
                ))
            ) : (
                <div className="p-4 text-center text-gray-500">
                    팔로우한 아이돌이 없습니다
                </div>
            )}
            <div className="border-t p-2 text-center">
                <Link to="/artists" className="text-sm text-blue-500 hover:underline">
                    아이돌 팔로우 / 언팔로우
                </Link>
            </div>
        </div>
    );
}

export default IdolDropdownPanel;
