import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from '@/components/layouts/Layout';
import Home from '@/pages/home/Home';
import Artist from '@/pages/artists/Artist';
import Schedule from '@/pages/schedule/Schedule';
import Timeline from '@/pages/timeline/Timeline';
import Login from '@/pages/signup/Login';
import Signup from '@/pages/signup/Signup';

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
