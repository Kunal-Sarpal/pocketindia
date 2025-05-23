import { Badge } from '@mui/material';
import { IoCartOutline, IoLogInSharp } from "react-icons/io5";
import { FaInstagram, FaEnvelope, FaTachometerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SiPocketcasts } from "react-icons/si";
import { useSelector } from 'react-redux';
import { MdLibraryAddCheck } from "react-icons/md";

const Sidebar = () => {
    const navigate = useNavigate();
    const cartItem = useSelector(state => state.cartdata.cartItems);

    const value = localStorage.getItem("value");
    const token = localStorage.getItem("token");

    return (
        <div className="text-[#191919] h-screen flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out">

            {/* Brand Name */}
            <div className="p-6 border-b-2 border-gray-200 w-96 z-[0] flex items-center gap-4">
                <h1 className="text-2xl text-zinc-700 font-extrabold flex items-center gap-2">
                    Pocket <SiPocketcasts size={18} className="text-zinc-700 rotate-[140deg]" />
                </h1>
                {token ? (
                    <li
                        onClick={() => { localStorage.removeItem("token");localStorage.removeItem("value"); navigate("/"); }}
                        className="bg-purple-100 w-fit text-zinc-600 flex justify-center font-semibold rounded-md p-2 items-center space-x-4 cursor-pointer hover:text-purple-600 transition-all duration-300 ease-in-out"
                    >
                        <IoLogInSharp size={20} className="text-lg" />
                        <span>Logout</span>
                    </li>
                ) : (
                    <li
                        onClick={() => navigate("/login")}
                        className="bg-purple-100 w-fit text-zinc-600 flex justify-center font-semibold rounded-md p-2 items-center space-x-4 cursor-pointer hover:text-purple-600 transition-all duration-300 ease-in-out"
                    >
                        <IoLogInSharp size={20} className="text-lg" />
                        <span>Login/SignUp</span>
                    </li>
                )}
            </div>

            {/* Navigation Links */}
            <ul className="space-y-4 px-6">

                <li className="font-normal text-zinc-600 p-2 rounded-md flex items-center space-x-4 cursor-pointer hover:bg-purple-100 hover:text-purple-600 transition-all duration-300 ease-in-out">
                    <FaTachometerAlt className="text-lg" />
                    <span>Dashboard</span>
                </li>

                {/* ADMIN */}
                {value === "1Z11" && token && (
                    <>
                        <li
                            onClick={() => navigate("/admin")}
                            className="hover:bg-purple-100 text-zinc-600 font-normal rounded-md p-2 flex items-center space-x-4 cursor-pointer hover:text-purple-600 transition-all duration-300 ease-in-out"
                        >
                            <FaEnvelope className="text-lg" />
                            <span>Admin</span>
                        </li>
                       
                    </>
                )}

                {/* CUSTOMER */}
                {value === "1Y11" && token && (
                    <li
                        onClick={() => navigate("/status")}
                        className="hover:bg-purple-100 text-zinc-600 font-normal rounded-md p-2 flex items-center space-x-4 cursor-pointer hover:text-purple-600 transition-all duration-300 ease-in-out"
                    >
                        <MdLibraryAddCheck size={20} className='text-lg' />
                        <span>Your Orders</span>
                    </li>
                )}

                {/* AGENT */}
                {value === "1X11" && token && (
                    <li
                        onClick={() => navigate("/agent/dashboard")}
                        className="hover:bg-purple-100 text-zinc-600 font-normal rounded-md p-2 flex items-center space-x-4 cursor-pointer hover:text-purple-600 transition-all duration-300 ease-in-out"
                    >
                        <MdLibraryAddCheck size={20} className='text-lg' />
                        <span>Agent Tasks</span>
                    </li>
                )}
            </ul>

            {/* Cart Section */}
            <div className="mt-auto pt-4 border-t-2 border-gray-200 w-full justify-center">
                <div className="flex items-center justify-start w-full space-x-4 px-4 py-2">
                    <Badge
                        badgeContent={cartItem.length}
                        color="error"
                        overlap="circular"
                        sx={{
                            '& .MuiBadge-dot': {
                                borderRadius: '50%',
                                width: 12,
                                height: 12,
                                backgroundColor: '#FF0000',
                            },
                            '& .MuiBadge-badge': {
                                fontSize: '0.75rem',
                                height: 24,
                                minWidth: 24,
                                backgroundColor: '#FF6F61',
                                color: '#fff',
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <div className="flex flex-col justify-center items-center">
                            <IoCartOutline
                                onClick={() => navigate('/cart')}
                                className="border-2 rounded-full p-2 border-zinc-600 hover:bg-zinc-200 hover:scale-110 transition-all duration-300 transform cursor-pointer"
                                size={40}
                            />
                        </div>
                    </Badge>
                    <div className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-all duration-200 ease-in-out">
                        Your Favorite Item
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="flex items-center justify-between p-4 mt-4 border-t-2 border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer text-xs">
                <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-xs text-zinc-600">RTM-25 ❤️</span>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="https://www.instagram.com/_the_kunal_1/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-md text-zinc-600 hover:text-purple-600" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
