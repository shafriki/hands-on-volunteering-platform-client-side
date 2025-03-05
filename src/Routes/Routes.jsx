import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";
import CreateEvent from "../Pages/CreateEvent/CreateEvent";
import PrivateRoute from "./PrivateRoute";

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
                element:<Register></Register>
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path: '/create-event',
                element:<PrivateRoute><CreateEvent></CreateEvent></PrivateRoute>
            }
        ]
    }
])