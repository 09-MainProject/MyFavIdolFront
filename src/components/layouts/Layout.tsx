import {useEffect} from 'react';
import {Outlet} from 'react-router';
import {ToastContainer} from 'react-toastify';
import {useAuthStore} from '@store/authStore.ts';
import {api} from '@/lib/api.ts';
import Footer from './Footer';
import Header from './Header/Header';
import Breadcrumb from '../common/Breadcrumb';
import ScrollTop from '../common/ScrollTop';

function Layout() {
    const {setLogin, csrfToken, accessToken, setUser, login} = useAuthStore();

    useEffect(() => {
        if (!csrfToken || !accessToken) return;
        
        // 토큰이 있으면 항상 로그인 상태로 설정
        if (!login) {
            setLogin(accessToken, csrfToken);
        }

        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile');
                const payload = accessToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                setUser({
                    ...response.data.data,
                    is_staff: decodedPayload.is_staff,
                    is_superuser: decodedPayload.is_superuser
                });
            } catch (e) {
                console.error(e);
            }
        };
        fetchProfile();
    }, [accessToken, csrfToken, setLogin, setUser, login]);

    return (
        <div>
            <Header/>
            <main className="py-8">
                <Breadcrumb/>
                <Outlet/>
            </main>
            <ToastContainer position="top-center" limit={1} closeButton={false} autoClose={3000} hideProgressBar/>

            <ScrollTop/>
            <Footer/>
        </div>
    );
}

export default Layout;
