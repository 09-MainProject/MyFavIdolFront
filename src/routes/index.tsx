import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './layouts/Layout';
import Home from './pages/Home';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
