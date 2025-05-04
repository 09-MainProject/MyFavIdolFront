import axios from 'axios';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import { Close, Hamburger } from '@assets/icons/inedx';
import Dropdown from '@components/common/Dropdown';
import IdolDropdownPanel from '@components/common/IdolDropdownPanel';
import DesktopMenu from '@components/layouts/Header/DesktopNav';
import MobileNav from '@components/layouts/Header/MobileNav';
import { HEADER_MENU } from '@constants/headerMenu';
import useDropdownToggle from '@hooks/useDropdownToggle';
import useMobile from '@hooks/useMobile';
import { useAuthStore } from '@store/authStore.ts';
import { useIdolState } from '@store/idolStore';

const DEFAULT_SELECTED_IDOL = '아이돌 선택';

function Header() {
  const { idols, selectedIdolId, setSelectIdol } = useIdolState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { login, setLogout, accessToken } = useAuthStore();
  const isMobile = useMobile();
  const {
    ref,
    isIdolDropdownOpen,
    handleToggleIdolDropdown,
    handleCloseIdolDropdown,
  } = useDropdownToggle();

  const selectedIdol = idols.find(idol => idol.id === selectedIdolId) || null;
  const displayedIdolName = selectedIdol?.name ?? DEFAULT_SELECTED_IDOL;

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleOnLogout = async () => {
    try {
      await axios.post('/token/logout', null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setLogout();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <header className="fixed z-[9999] w-full max-w-[1080px] bg-white">
      <div className="flex items-center p-4">
        <div className="relative flex items-center gap-4" ref={ref}>
          <Link to="/">
            <h1 className="pb-2 text-3xl leading-none font-bold">Wistar</h1>
          </Link>
          <Dropdown
            isDropdownOpen={isIdolDropdownOpen}
            handleToggleIdolDropdown={handleToggleIdolDropdown}
            displayedIdolName={displayedIdolName}
            mode="header"
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
              <Link to="/login">
                <button type="button" onClick={handleOnLogout}>
                  {login ? 'logout' : 'login'}
                </button>
              </Link>
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
