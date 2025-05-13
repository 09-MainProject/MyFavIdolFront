import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from '@/components/layouts/Layout';

import Artist from '@/pages/artists/Artist';
import Home from '@/pages/home/Home';
import Schedule from '@/pages/schedule/Schedule';
import ScheduleDetail from '@/pages/schedule/ScheduleDetail';
import CheckPassword from '@/pages/signup/CheckPassword';
import EditProfile from '@/pages/signup/EditProfile';
import Login from '@/pages/signup/Login';
import Profile from '@/pages/signup/Profile';
import Signup from '@/pages/signup/Signup';
import Timeline from '@/pages/timeline/Timeline';
import TimelineDetail from '@/pages/timeline/TimelineDetail';
import TimelineEdit from '@/pages/timeline/TimelineEdit';
import TimelineWrite from '@/pages/timeline/TimelineWrite';


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
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/checkpassword',
          element: <CheckPassword />,
        },
        {
path: '/editprofile',
element: <EditProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
