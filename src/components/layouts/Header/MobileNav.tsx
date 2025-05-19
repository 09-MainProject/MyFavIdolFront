import React from 'react';
import {Link} from 'react-router';
import type {HeaderMenuItem} from '@constants/headerMenu.ts';

type Props = {
    menuList: HeaderMenuItem[];
    handleCloseMobileMenu: () => void;
    login: boolean;
};

function MobileNav({menuList, handleCloseMobileMenu, login}: Props) {
    return (
        <nav className="absolute top-14 left-1/2 w-full -translate-x-1/2 bg-white p-4 shadow-lg">

            <ul className="space-y-4">
                {menuList.map(menu => (
                    <li key={menu.title}>
                        <Link to={menu.href} className="block hover:text-blue-500">
                            <button type="button" onClick={handleCloseMobileMenu}>

                                {menu.title}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex justify-end gap-4 border-t pt-4 text-sm">
                <Link to="/login" className="hover:underline">
                    <button type="button" onClick={handleCloseMobileMenu}>
                        {!login && '로그인'}
                    </button>
                </Link>
                <Link to="/signup" className="hover:underline">
                    <button type="button" onClick={handleCloseMobileMenu}>
                        회원가입
                    </button>
                </Link>
            </div>
        </nav>

    );
}

export default MobileNav;
