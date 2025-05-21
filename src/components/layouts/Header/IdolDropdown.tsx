import React, {useState} from 'react';
import {Link} from 'react-router';
import {useAuthStore} from '@store/authStore';
import PerformToast from '@utils/PerformToast';

type Props = {
    idols: Array<{
        id: number;
        name: string;
        img: string;
    }>;
    setSelectIdol: (id: number) => void;
    selectedIdolId: number | null;
    displayedIdolName: string;
};

function IdolDropdown({idols, setSelectIdol, selectedIdolId, displayedIdolName}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const {login} = useAuthStore();

    const handleIdolSelect = (id: number) => {
        if (!login) {
            PerformToast({msg: '로그인이 필요한 서비스입니다.', type: 'warning'});
            return;
        }
        setSelectIdol(id);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded border px-4 py-2 hover:bg-gray-50"
            >
                <span>{displayedIdolName}</span>
                <span className="text-xs">▼</span>
            </button>
            {isOpen && (
                <div className="absolute top-full mt-1 w-48 rounded-md border bg-white shadow-lg">
                    {login ? (
                        <>
                            {idols.length > 0 ? (
                                <div className="max-h-60 overflow-y-auto">
                                    {idols.map(idol => (
                                        <button
                                            key={idol.id}
                                            type="button"
                                            onClick={() => handleIdolSelect(idol.id)}
                                            className={`flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-50 ${
                                                selectedIdolId === idol.id ? 'bg-gray-50' : ''
                                            }`}
                                        >
                                            <span>{idol.name}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    팔로우한 아이돌이 없습니다
                                </div>
                            )}
                            <div className="border-t p-2 text-center">
                                <Link to="/artists" className="text-sm text-blue-500 hover:underline">
                                    아이돌 추가하기
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="p-4 text-center">
                            <p className="mb-2 text-sm text-gray-500">로그인이 필요한 서비스입니다</p>
                            <Link
                                to="/login"
                                className="inline-block rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
                            >
                                로그인하기
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default IdolDropdown;