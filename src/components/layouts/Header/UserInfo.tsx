import React from 'react';
import {Link} from 'react-router';

type User = {
    nickname: string;
    profileImg?: string;
}

type Props = {
    handleOnLogout: () => void;
    openDropdown: boolean;
    setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>
    user: User;
    login: boolean;
}

function UserInfo({handleOnLogout, user, setOpenDropdown, openDropdown, login}: Props) {
    return (
        <div className="ml-auto flex items-center gap-4">
            {
                login ?
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setOpenDropdown(prev => !prev)}
                            className="text-sm font-semibold hover:underline"
                        >
                            {user?.nickname}님 ▼
                        </button>
                        {
                            openDropdown &&
                            <div
                                className="absolute right-0 z-10 mt-2 w-40 rounded border bg-white text-sm shadow">

                                <Link
                                    to="/profile"
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                >
                                    내 프로필
                                </Link>
                                <Link
                                    to="/checkpassword"
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                >
                                    회원정보 수정
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleOnLogout}
                                    className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                                >
                                    로그아웃
                                </button>
                            </div>
                        }
                    </div>
                    : <ul className="flex gap-4">
                        <li className="cursor-pointer">
                            <Link to="/login">로그인</Link>
                        </li>
                        <li className="cursor-pointer">
                            <Link to="/signup">회원가입</Link>
                        </li>
                    </ul>}

        </div>
    );
}

export default UserInfo;