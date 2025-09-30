
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="width container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold 
        text-[#270450]/90 ">
          PromptPal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-[#270450] ">Discover</Link>
          <Link to="/" className="hover:text-[#270450] ">Community</Link>
          <Link to="/" className="hover:text-[#270450] ">Library</Link>
          <Link to="/" className="hover:text-[#270450] ">Pricing</Link>
        </div>

        {/* Buttons */}
       <div className="hidden md:flex space-x-4">
  <Link
    to="/login"
    className="px-4 py-2 rounded-lg text-[#270450] hover:bg-purple-100"
  >
    Login
  </Link>

  <Link
    to="/register"
    className="px-4 py-2 rounded-lg bg-[#270450]/90  text-white hover:text-white "
  >
    Sign Up
  </Link>
</div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#270450]/90 "
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-3">
          <Link to="/" className="block hover:text-[#270450]/90 ">Discover</Link>
          <Link to="/" className="block hover:text-[#270450]/90 ">Community</Link>
          <Link to="/" className="block hover:text-[#270450]/90 ">Library</Link>
          <Link to="/" className="block hover:text-[#270450]/90 ">Pricing</Link>
          <button className="w-full px-4 py-2 rounded-lg text-[#270450]/90  hover:bg-purple-100">Login</button>
          <button className="w-full px-4 py-2 rounded-lg bg-[#270450]/90  text-white hover:bg-[#270450]/90">Sign Up</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
