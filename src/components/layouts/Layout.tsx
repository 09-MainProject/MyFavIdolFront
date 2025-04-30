import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header/Header';
import Breadcrumb from '../common/Breadcrumb';

function Layout() {
  return (
    <div>
      <Header />
      <main className="py-8">
        <Breadcrumb />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
