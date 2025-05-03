import { createBrowserRouter, RouterProvider } from 'react-router';
import ScheduleDetail from '@pages/schedule/ScheduleDetail';
import TimelineDetail from '@pages/timeline/TimelineDetail';
import TimelineEdit from '@pages/timeline/TimelineEdit.tsx';
import TimelineWrite from '@pages/timeline/TimelineWrite.tsx';
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
          path: '/schedule/:id',
          element: <ScheduleDetail />,
        },
        {
          path: '/timeline',
          element: <Timeline />,
        },
        {
          path: '/timeline/write',
          element: <TimelineWrite />,
        },
        {
          path: '/timeline/:id',
          element: <TimelineDetail />,
        },
        {
          path: '/timeline/edit/:id',
          element: <TimelineEdit />,
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
