import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register/Register";

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
            }
        ]
    }
])