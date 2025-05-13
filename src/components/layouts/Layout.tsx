import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useAuthStore } from '@store/authStore.ts';
import Footer from './Footer';
import Header from './Header/Header';
import Breadcrumb from '../common/Breadcrumb';
import ScrollTop from '../common/ScrollTop';

function Layout() {
  const { login, setLogin, csrfToken, accessToken, setUser } = useAuthStore();

  useEffect(() => {
    if (!csrfToken || !accessToken || login) return;
    setLogin(accessToken, csrfToken);
    const fetchProfile = async () => {
      try {
        console.log('➡️ 프로필 요청 시도');
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('✅ 프로필 받아옴:', response.data);
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
      <Header />
      <main className="py-8">
        <Breadcrumb />
        <Outlet />
      </main>
      <ScrollTop />
      <Footer />
    </div>
  );
}

export default Layout;
