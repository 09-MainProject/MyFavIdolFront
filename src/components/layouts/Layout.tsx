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
    const {setLogin, csrfToken, accessToken, setUser} = useAuthStore();

    useEffect(() => {
        if (!csrfToken || !accessToken) return;
        setLogin(accessToken, csrfToken);
        const fetchProfile = async () => {
            try {
                const response = await api.get('/users/profile');
                setUser(response.data.data);
                const payload = accessToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                console.log('계정 :', decodedPayload);
                setUser({
                    ...response.data.data,
                    is_staff: decodedPayload.is_staff,
                    is_superuser: decodedPayload.is_superuser
                });
                console.log('layout에서 데이터 출력 :', response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchProfile();
    }, [accessToken, csrfToken, setLogin, setUser]);

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
