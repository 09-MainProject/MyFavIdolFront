import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from '@/components/layouts/Layout';
import Artist from '@/pages/artists/Artist';
import Home from '@/pages/home/Home';
import Schedule from '@/pages/schedule/Schedule';
import Login from '@/pages/signup/Login';
import Signup from '@/pages/signup/Signup';
import Timeline from '@/pages/timeline/Timeline';

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
        {
          path: '/artists',
          element: <Artist />,
        },
        {
          path: '/schedule',
          element: <Schedule />,
        },
        {
          path: '/timeline',
          element: <Timeline />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
