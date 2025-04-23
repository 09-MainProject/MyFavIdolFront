import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from '@/routes/layouts/Layout';
import Home from '@/routes/pages/Home';

function App() {
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

export default App;
