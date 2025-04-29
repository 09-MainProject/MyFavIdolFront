import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Close, Hamburger } from '@assets/icons/inedx';
import Dropdown from '@components/common/Dropdown';
import IdolDropdownPanel from '@components/common/IdolDropdownPanel';
import DesktopMenu from '@components/layouts/Header/DesktopNav';
import MobileNav from '@components/layouts/Header/MobileNav';
import { HEADER_MENU } from '@constants/headerMenu';
import useMobile from '@hooks/useMobile';
import { useIdolState } from '@store/idolStore';

const DEFAULT_SELECTED_IDOL = '아이돌 선택';

function Header() {
  const { idols, selectedIdolId, setSelectIdol } = useIdolState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIdolDropdownOpen, setIsIdolDropdownOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();

  const selectedIdol = idols.find(idol => idol.id === selectedIdolId) || null;
  const displayedIdolName = selectedIdol?.name ?? DEFAULT_SELECTED_IDOL;

  const handleToggleIdolDropdown = useCallback(() => {
    setIsIdolDropdownOpen(prev => !prev);
  }, []);

  const handleCloseIdolDropdown = useCallback(() => {
    setIsIdolDropdownOpen(false);
  }, []);

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    setIsIdolDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed z-[9999] w-full max-w-[1080px] bg-white">
      <div className="flex items-center p-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="pb-2 text-3xl leading-none font-bold">Wistar</h1>
          </Link>
          <Dropdown
            isDropdownOpen={isIdolDropdownOpen}
            handleToggleIdolDropdown={handleToggleIdolDropdown}
            displayedIdolName={displayedIdolName}
          >
            <IdolDropdownPanel
              idols={idols}
              selectedIdolId={selectedIdolId}
              setSelectIdol={setSelectIdol}
              handleCloseIdolDropdown={handleCloseIdolDropdown}
            />
          </Dropdown>
        </div>
        {!isMobile ? (
          <DesktopMenu menuList={HEADER_MENU} />
        ) : (
          <div className="ml-auto">
            <button
              type="button"
              onClick={handleToggleMobileMenu}
              className="cursor-pointer"
            >
              {isMobileMenuOpen ? <Close /> : <Hamburger />}
            </button>

            {isMobileMenuOpen && <MobileNav menuList={HEADER_MENU} />}
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
