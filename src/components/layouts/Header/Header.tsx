import {useCallback, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router';
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
    const idols = followedIdols.map(idol => ({
        id: idol.id,
        name: idol.name,
        img: idol.image_url
    }));
    const mobileRef = useRef<null | HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {login, user, setLogout} = useAuthStore();
    const [openDropdown, setOpenDropdown] = useState(false);
    const isMobile = useMobile();

    useOutsideClick(mobileRef, () => setIsMobileMenuOpen(false), isMobileMenuOpen);

    const selectedIdol = idols.find(idol => idol.id === selectedIdolId) || null;
    const displayedIdolName = selectedIdol?.name ?? DEFAULT_SELECTED_IDOL;

    const handleToggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const handleCloseMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleOnLogout = async () => {
        try {
            await api.post('/users/token/logout');
        } catch (error) {
            console.log(error);
        }
        setLogout();
        navigate('/');
    };

    const renderUserSection = () => {
        if (!login) {
            return (
                <div className="flex items-center gap-4 text-sm">
                    <Link to="/login" className="hover:text-blue-500">
                        로그인
                    </Link>
                    <Link to="/signup" className="hover:text-blue-500">
                        회원가입
                    </Link>
                </div>
            );
        }

        return (
            <UserInfo
                login={login}
                user={user}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                handleOnLogout={handleOnLogout}/>
        );
    };

    return (
        <header className="fixed z-[9999] w-full max-w-[1080px] bg-white">
            <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-xl font-bold leading-none">
                        MyFavIdol
                    </Link>
                    <IdolDropdown idols={idols}
                                  setSelectIdol={setSelectIdol}
                                  selectedIdolId={selectedIdolId}
                                  displayedIdolName={displayedIdolName}
                    />
                    {!isMobile && <DesktopMenu menuList={HEADER_MENU}/>}
                </div>
                {isMobile ? (
                    <>
                        {login && (
                            <UserInfo
                                login={login}
                                user={user}
                                openDropdown={openDropdown}
                                setOpenDropdown={setOpenDropdown}
                                handleOnLogout={handleOnLogout}/>
                        )}
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
                    renderUserSection()
                )}
            </div>
        </header>
    );
}

export default Header;
