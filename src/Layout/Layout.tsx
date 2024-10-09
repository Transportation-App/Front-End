import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../icons8-bus-office-m-96.png";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={Icon} alt="App Icon" className="h-8 w-8 mr-2" />
          <h1 className="text-lg font-bold">GoGo</h1>
        </div>

        <nav className="flex space-x-4">
          <NavLink to="/home" className="text-white hover:text-gray-400">
            Home
          </NavLink>
          <NavLink to="/about" className="text-white hover:text-gray-400">
            About
          </NavLink>
          <NavLink to="/contact" className="text-white hover:text-gray-400">
            Contact
          </NavLink>
        </nav>
      </header>

      <main className="flex justify-center items-center min-h-[90vh] h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
