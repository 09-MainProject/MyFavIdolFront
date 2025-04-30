import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header/Header';
import Breadcrumb from '../common/Breadcrumb';
import ScrollTop from '../common/ScrollTop';

function Layout() {
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
