import React from 'react';
import { Link } from 'react-router';
import type { HeaderMenuItem } from '@constants/headerMenu.ts';

type Props = {
  menuList: HeaderMenuItem[];
};

function DesktopNav({ menuList }: Props) {
  return (
    <nav className="flex items-center gap-6">
      {menuList.map(menu => (
        <Link key={menu.title} to={menu.href}>
          {menu.title}
        </Link>
      ))}
    </nav>
  );
}

export default React.memo(DesktopNav);
