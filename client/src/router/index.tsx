import {
    createBrowserRouter, redirect,
} from "react-router-dom";
import Home from "../pages/Home";
import Layouts from "../components/Layouts";
import Detail from "../pages/Detail";
import Form from "../components/Form";
import Login from "../pages/Login";
import Register from "../pages/Register";


const router = createBrowserRouter([

    {
        path: "",
        element: <Layouts />,
        loader: async () => {
            if (!localStorage.token) return redirect('/login')
            return null
        },
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/:id",
                element: <Detail />,
            },
            {
                path: "/add",
                element: <Form />,
            },
            {
                path: "/edit/:id",
                element: <Form />,
            }
        ],
    },
    {
        path: "/login",
        element: <Login />,
        loader: async () => {
            if (localStorage.token) return redirect('/')
            return null
        },
    },
    {
        path: "/register",
        element: <Register />,
    }
]);

export default router;