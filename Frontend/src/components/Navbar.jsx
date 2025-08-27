import img1 from "../assets/ChatMate-Logo.png";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-3 bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 shadow-lg flex justify-between items-center rounded-b-2xl border-b-4 border-indigo-400">
      <div className="flex items-center gap-4">
        <img
          className="w-[48px] h-[48px] rounded-full shadow-md border-2 border-white bg-white object-contain"
          src={img1}
          alt="ChatMate Logo"
        />
        <span className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
          ChatMate
        </span>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative group">
          <CgProfile
            fontSize={40}
            className="text-white drop-shadow-lg transition-transform group-hover:scale-110"
          />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-white text-indigo-700 text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
            Profile
          </span>
        </button>
        {/* Example: Add more nav actions here */}
        {/* <button className="text-white font-semibold px-4 py-2 rounded hover:bg-indigo-600 transition">Settings</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
