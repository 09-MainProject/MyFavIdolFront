import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import {Close, Hamburger} from '@assets/icons/inedx';
import DesktopMenu from '@components/layouts/Header/DesktopNav';
import IdolDropdown from '@components/layouts/Header/IdolDropdown.tsx';
import MobileNav from '@components/layouts/Header/MobileNav';
import UserInfo from '@components/layouts/Header/UserInfo';
import {HEADER_MENU} from '@constants/headerMenu';
import useMobile from '@hooks/useMobile';
import useOutsideClick from '@hooks/useOutsideClick.tsx';
import {useAuthStore} from '@store/authStore.ts';
import {useIdolState} from '@store/idolStore';
import {api} from '@/lib/api.ts';

const DEFAULT_SELECTED_IDOL = '아이돌 선택';

function Header() {
    const {followedIdols, selectedIdolId, setSelectIdol} = useIdolState();
    const idols = followedIdols;
    const mobileRef = useRef<null | HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {login, user, setLogout} = useAuthStore();
    const [openDropdown, setOpenDropdown] = useState(false);
    const isMobile = useMobile();
    const {
        ref,
        dropdownOpen,
        handleToggleDropdown,
        handleCloseDropdown
    } = useOutsideClick();

    const selectedIdol = idols.find(idol => idol.id === selectedIdolId) || null;
    const displayedIdolName = selectedIdol?.name ?? DEFAULT_SELECTED_IDOL;

    const handleToggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const handleCloseMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    useEffect(() => {
        const handle = (e: globalThis.MouseEvent) => {
            const target = e.target as Node;
            if (isMobileMenuOpen && mobileRef.current && !mobileRef.current.contains(target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handle);
        return () => {
            document.removeEventListener('mousedown', handle);
        };
    }, [isMobileMenuOpen]);

    const handleOnLogout = async () => {
        try {
            await api.post('/users/token/logout');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
        setLogout();
        navigate('/');
    };

    return (
        <header className="fixed z-[9999] w-full max-w-[1080px] bg-white">
            <div className="flex items-center p-4 " ref={ref}>
                <IdolDropdown handleToggleDropdown={handleToggleDropdown} idols={idols}
                              setSelectIdol={setSelectIdol} handleCloseDropdown={handleCloseDropdown}
                              dropdownOpen={dropdownOpen} selectedIdolId={selectedIdolId}
                              displayedIdolName={displayedIdolName}
                              />
                {isMobile ? (
                    <>
                        <UserInfo
                            login={login}
                            user={user}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            handleOnLogout={handleOnLogout}/>
                        <div className="ml-auto" ref={mobileRef}>
                            <button
                                type="button"
                                onClick={handleToggleMobileMenu}
                                className="cursor-pointer"
                            >
                                {isMobileMenuOpen ? <Close/> : <Hamburger/>}
                            </button>
                            {isMobileMenuOpen &&
                                <MobileNav menuList={HEADER_MENU} handleCloseMobileMenu={handleCloseMobileMenu}
                                           login={login}/>}
                        </div>
                    </>
                ) : (
                    <>
                        <DesktopMenu menuList={HEADER_MENU}/>
                        <UserInfo
                            login={login}
                            user={user}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            handleOnLogout={handleOnLogout}/>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
