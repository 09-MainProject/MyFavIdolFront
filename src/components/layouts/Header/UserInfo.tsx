import React, {useRef} from 'react';
import {Link} from 'react-router';
import useOutsideClick from '@hooks/useOutsideClick';
import {User} from '@store/authStore';

type Props = {
    login: boolean;
    user: User | null;
    openDropdown: boolean;
    setOpenDropdown: (open: boolean) => void;
    handleOnLogout: () => void;
};

function UserInfo({login, user, openDropdown, setOpenDropdown, handleOnLogout}: Props) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef, () => setOpenDropdown(false), openDropdown);

    if (!login) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 text-sm hover:text-blue-500"
            >
                <span>{user?.nickname}</span>
                <span className="text-xs">▼</span>
            </button>
            {openDropdown && (
                <div className="absolute right-0 top-full mt-2 w-32 rounded-md bg-white p-2 shadow-lg">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/profile" className="block text-sm hover:text-blue-500">
                                프로필
                            </Link>
                        </li>
                        <li>
                            <Link to="/mypage" className="block text-sm hover:text-blue-500">
                                마이페이지
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={handleOnLogout}
                                className="block w-full text-left text-sm hover:text-blue-500"
                            >
                                로그아웃
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserInfo;