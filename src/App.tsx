import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from '@/components/layouts/Layout';

import Artist from '@/pages/artists/Artist';
import ArtistDetail from './pages/artists/ArtistDetail';
import CreateArtist from './pages/artists/CreateArtist';
import EditArtist from './pages/artists/EditArtist';
import Home from '@/pages/home/Home';
import Schedule from '@/pages/schedule/Schedule';
import ScheduleCreatePage from '@pages/schedule/ScheduleCreatePage.tsx';
import ScheduleDetail from '@/pages/schedule/ScheduleDetail';
import CheckPassword from '@/pages/signup/CheckPassword';
import EditProfile from '@/pages/signup/EditProfile';
import Login from '@/pages/signup/Login';
import Profile from '@/pages/signup/Profile';
import Signup from '@/pages/signup/Signup';
import Timeline from '@/pages/timeline/Timeline';
import TimelineDetail from '@/pages/timeline/TimelineDetail';
import TimelineForm from '@pages/timeline/TimelineForm.tsx';


function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>,
                },
                {
                    path: '/artists',
                    element: <Artist/>,
                },
                {
                    path: '/schedule',
                    element: <Schedule/>,
                },
                {
                    path: '/schedule/create',
                    element: <ScheduleCreatePage/>,
                },
                {
                    path: '/schedule/:id',
                    element: <ScheduleDetail/>,
                },
                {
                    path: '/timeline',
                    element: <Timeline/>,
                },
                {
                    path: '/timeline/write',
                    element: <TimelineForm/>,
                },
                {
                    path: '/timeline/:id',
                    element: <TimelineDetail/>,
                },
                {
                    path: '/timeline/edit/:id',
                    element: <TimelineForm/>,
                },
                {
                    path: '/login',
                    element: <Login/>,
                },
                {
                    path: '/signup',
                    element: <Signup/>,
                },
                {
                    path: '/profile',
                    element: <Profile/>,
                },
                {
                    path: '/checkpassword',
                    element: <CheckPassword/>,
                },
                {
                    path: '/editprofile',
                    element: <EditProfile/>,
                },
                {
                    path: '/artists/create',
                    element: <CreateArtist/>,
                },
                {
                    path: '/artists/:id',
                    element: <ArtistDetail/>,
                },
                {
                    path: '/artists/:id/edit',
                    element: <EditArtist/>,
              },
                {
          path: '/schedule/:scheduleId',
          element: <ScheduleDetail />,
        },
            ],
        },
    ]);

    return <RouterProvider router={router}/>;
}

export default App;
