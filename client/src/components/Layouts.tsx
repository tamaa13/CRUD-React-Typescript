import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layouts = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layouts