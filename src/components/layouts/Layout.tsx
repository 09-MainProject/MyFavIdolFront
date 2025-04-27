import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  return (
    <div>
      <Header />
      <main className="py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
