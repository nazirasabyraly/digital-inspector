import React from "react";

const Navbar: React.FC = () => (
  <nav className="w-full px-8 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 z-50">
    <div className="flex items-center gap-4">
      <span className="font-extrabold text-lg tracking-widest text-white">ARMETA</span>
      <ul className="hidden md:flex gap-8 ml-8 text-white/80 font-medium">
        <li className="hover:text-white transition">Problems</li>
        <li className="hover:text-white transition">Solutions</li>
        <li className="hover:text-white transition">Team</li>
      </ul>
    </div>
    <button className="border border-white text-white px-5 py-2 rounded-full font-semibold hover:bg-white/10 transition shadow-lg">Contact Us</button>
  </nav>
);

export default Navbar;
