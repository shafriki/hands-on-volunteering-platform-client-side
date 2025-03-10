import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";
import CreateEvent from "../Pages/CreateEvent/CreateEvent";
import PrivateRoute from "./PrivateRoute";
import AllEvents from "../Pages/AllEvents/AllEvents";
import EventDetails from "../Pages/EventDetails/EventDetails";
import MyEvents from "../Pages/MyEvents/MyEvents";
import UpdateEvents from "../Pages/MyEvents/UpdateEvents";
import MyJoiningEvent from "../Pages/MyJoiningEvents/MyJoiningEvent";
import Profile from "../Pages/MyProfile/Profile";
import HelpRequest from "../Pages/HelpRequest/HelpRequest";
import AllHelpPost from "../Pages/AllHelpPost/AllHelpPost";
import CreateTeam from "../Pages/CreateTeam/CreateTeam";
import JoinTeam from "../Pages/JoinTeam/JoinTeam";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <h1>error page</h1>,
        children: [
            {
                path: '/',
                element:<Home></Home>,
                
            },
            {
                path: '/register',
                element:<Register></Register>,
            },
            {
                path: '/login',
                element:<Login></Login>,
            },
            {
                path: '/all-events',
                element:<AllEvents></AllEvents>
            },
            {
                path: '/create-event',
                element:<PrivateRoute><CreateEvent></CreateEvent></PrivateRoute>,
            },
            {
                path: '/event-details/:id',
                element:<PrivateRoute><EventDetails></EventDetails></PrivateRoute>,
            },
            {
                path: '/my-events',
                element:<PrivateRoute><MyEvents></MyEvents></PrivateRoute>,
            },
            {
                path: '/my-event/update/:id',
                element:<PrivateRoute><UpdateEvents></UpdateEvents></PrivateRoute>,
            },
            {
                path: '/my-join-events',
                element:<PrivateRoute><MyJoiningEvent></MyJoiningEvent></PrivateRoute>,
            },
            {
                path: '/create-help-request',
                element:<PrivateRoute><HelpRequest></HelpRequest></PrivateRoute>,
            },
            {
                path: '/all-help-post',
                element:<PrivateRoute><AllHelpPost></AllHelpPost></PrivateRoute>,
            },
            {
                path: '/profile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: '/create-team',
                element:<PrivateRoute><CreateTeam></CreateTeam></PrivateRoute>,
            },
            {
                path: '/join-team',
                element:<PrivateRoute><JoinTeam></JoinTeam></PrivateRoute>,
            }
        ]
    }
])