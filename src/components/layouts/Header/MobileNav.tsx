import React from 'react';
import { Link } from 'react-router';
import type { HeaderMenuItem } from '@constants/headerMenu.ts';

type Props = {
  menuList: HeaderMenuItem[];
};

function MobileNav({ menuList }: Props) {
  return (
    <nav className="absolute top-14 left-1/2 w-full -translate-x-1/2 bg-white p-4 shadow-lg">
      <ul className="space-y-4">
        {menuList.map(menu => (
          <li key={menu.title}>
            <Link to={menu.href} className="block hover:text-blue-500">
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end gap-4 border-t pt-4 text-sm">
        <Link to="/login" className="hover:underline">
          로그인
        </Link>
        <Link to="/signup" className="hover:underline">
          회원가입
        </Link>
      </div>
    </nav>
  );
}

export default MobileNav;
