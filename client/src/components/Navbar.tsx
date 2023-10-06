import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
            <nav className="bg-white shadow dark:bg-gray-800 ">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center justify-between w-full">
                            <img className="h-10 w-15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/2560px-Valorant_logo_-_pink_color_version.svg.png" alt="Workflow" />
                            <div className="hidden md:block">
                                <div className="flex items-baseline ml-10 space-x-4">
                                    <Link to="/"
                                        className="px-3 py-2 text-sm font-medium text-gray-800 rounded-md dark:text-white hover:text-gray-800 dark:hover:text-white"
                                    >
                                        Home
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="px-3 py-2 text-sm font-medium text-gray-800 rounded-md dark:text-white hover:text-gray-800 dark:hover:text-white"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <div className="flex items-center ml-4 md:ml-6"></div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
};
export default Navbar;