import axios from 'axios';
import {useEffect} from 'react';
import {Outlet} from 'react-router';
import {ToastContainer} from 'react-toastify';
import {useAuthStore} from '@store/authStore.ts';
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
                const response = await axios.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(response.data.data);
            } catch (e) {
                // eslint-disable-next-line no-console
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
