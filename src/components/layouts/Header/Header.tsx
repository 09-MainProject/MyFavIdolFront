import axios from 'axios';
import {useCallback, useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {Close, Hamburger} from '@assets/icons/inedx';
import Dropdown from '@components/common/Dropdown/Dropdown.tsx';
import DesktopMenu from '@components/layouts/Header/DesktopNav';
import MobileNav from '@components/layouts/Header/MobileNav';
import {HEADER_MENU} from '@constants/headerMenu';
import useDropdownToggle from '@hooks/useDropdownToggle';
import useMobile from '@hooks/useMobile';
import IdolDropdownPanel from '@pages/schedule/IdolDropdownPanel.tsx';
import {useAuthStore} from '@store/authStore.ts';
import {useIdolState} from '@store/idolStore';

const DEFAULT_SELECTED_IDOL = '아이돌 선택';

function Header() {
    const idols = [];
    const {selectedIdolId, setSelectIdol} = useIdolState();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {login, user, setLogout, accessToken} = useAuthStore();
    const [openDropdown, setOpenDropdown] = useState(false);
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
                headers: {Authorization: `Bearer ${accessToken}`},
            });
            setLogout();
            navigate('/');
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
                    <DesktopMenu menuList={HEADER_MENU}/>
                ) : (
                    <div className="ml-auto">
                        <button
                            type="button"
                            onClick={handleToggleMobileMenu}
                            className="cursor-pointer"
                        >
                            {isMobileMenuOpen ? <Close/> : <Hamburger/>}
                        </button>

                        {isMobileMenuOpen && <MobileNav menuList={HEADER_MENU}/>}
                    </div>
                )}

                {!isMobile && (
                    <div className="ml-auto flex items-center gap-4">
                        {login ? (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenDropdown(prev => !prev)}
                                    className="text-sm font-semibold hover:underline"
                                >
                                    {user?.nickname}님 ▼
                                </button>

                                {openDropdown && (
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
                                )}
                            </div>
                        ) : (
                            <ul className="flex gap-4">
                                <li>
                                    <Link to="/login">로그인</Link>
                                </li>
                                <li>
                                    <Link to="/signup">회원가입</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
