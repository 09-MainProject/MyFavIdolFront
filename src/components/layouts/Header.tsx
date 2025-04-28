import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Close, Hamburger } from '@/assets/icons/inedx';
import Dropdown from '@/components/common/Dropdown';
import IdolDropdownPanel from '@/components/common/IdolDropdownPanel';
import { HEADER_MENU } from '@/constants/headerMenu';
import useMobile from '@/hooks/useMobile';
import { useIdolState } from '@/store/idolStore';

function Header() {
  const { idols, selectedIdolId, setSelectIdol } = useIdolState();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();

  const selectedIdol = idols.find(idol => idol.id === selectedIdolId) || null;

  const handleOnToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleOnDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed z-[9999] w-full max-w-[1080px] bg-white">
      <div className="flex items-center p-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="pb-2 text-3xl leading-none font-bold">Wistar</h1>
          </Link>

          <Dropdown
            isDropdownOpen={isDropdownOpen}
            handleOnToggle={handleOnToggle}
            selectedIdol={selectedIdol?.name ?? '아이돌 선택'}
          >
            <IdolDropdownPanel
              idols={idols}
              selectedIdolId={selectedIdolId}
              setSelectIdol={setSelectIdol}
              handleOnDropdownClose={handleOnDropdownClose}
            />
          </Dropdown>
        </div>

        {!isMobile ? (
          <nav className="flex items-center gap-6">
            {HEADER_MENU.map(menu => (
              <Link key={menu.title} to={menu.href}>
                {menu.title}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setIsOpen(prev => !prev)}
              className="cursor-pointer"
              aria-label="메뉴 열기"
            >
              {isOpen ? <Close /> : <Hamburger />}
            </button>

            {isOpen && (
              <nav className="absolute top-14 left-1/2 w-full -translate-x-1/2 bg-white p-4 shadow-lg">
                <ul className="space-y-4">
                  {HEADER_MENU.map(menu => (
                    <li key={menu.title}>
                      <Link
                        to={menu.href}
                        className="block hover:text-blue-500"
                      >
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
            )}
          </div>
        )}

        {!isMobile && (
          <ul className="ml-auto flex gap-4">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
