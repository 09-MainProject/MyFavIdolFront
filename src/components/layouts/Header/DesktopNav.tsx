import React from 'react';
import { Link } from 'react-router';
import type { HeaderMenuItem } from '@constants/headerMenu.ts';

type Props = {
  menuList: HeaderMenuItem[];
};

function DesktopNav({ menuList }: Props) {

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {menuList.map(menu => (
          <li key={menu.title}>
            <Link to={menu.href} className="text-sm hover:text-blue-500">
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default React.memo(DesktopNav);
