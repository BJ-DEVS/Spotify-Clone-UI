import { FaSpotify } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { BsBrowserEdge } from "react-icons/bs";
import { GrInstallOption } from "react-icons/gr";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-black px-4 py-3 fixed top-0 right-0 left-0 z-50">

      {/* Left side */}
      <div className="flex items-center gap-4">

        {/* Spotify Icon */}
        <FaSpotify size={38} className="text-white flex-shrink-0" />

        {/* Home Icon */}
        <div className="w-12 h-12 rounded-full bg-[#2f2b2b] flex items-center justify-center flex-shrink-0">
          <GoHomeFill size={24} className="text-white" />
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-[#2a2a2a] rounded-full px-4 py-3 w-[320px] lg:w-[500px] hover:bg-[#3a3a3a] transition">
          <FiSearch className="text-gray-400 mr-3 flex-shrink-0" size={22} />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent outline-none text-white text-sm w-full placeholder-gray-400"
          />
          <div className="flex items-center ml-4">
            <div className="w-[1px] h-8 bg-gray-500 mr-4"></div>
            <BsBrowserEdge className="text-gray-300 cursor-pointer flex-shrink-0" size={22} />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 text-gray-400 text-md flex-shrink-0">

        {/* Links — hidden on small screens */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="hover:text-white transition font-medium">Premium</a>
          <a href="#" className="hover:text-white transition font-medium">Support</a>
          <a href="#" className="hover:text-white transition font-medium">Download</a>
        </div>

        <div className="w-[1px] h-8 bg-gray-600 hidden md:block"></div>

        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition font-medium hidden lg:flex items-center gap-2">
            <GrInstallOption size={20} />
            Install App
          </a>
          <a href="#" className="hover:text-white transition font-medium">Sign up</a>
          <a href="#" className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition font-bold text-sm">
            Login
          </a>
        </div>

      </div>
    </div>
  );
};

export default Navbar;