import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

const Navbar = () => {
  const [ShowMobileMenu, setShowMobileMenu] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else toast.success("Logged out");
  };

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        <img src={assets.logo} alt="Logo" />

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-7 text-white">
          <a href="#header" className="cursor-pointer hover:text-gray-400">Home</a>
          <a href="#About" className="cursor-pointer hover:text-gray-400">About</a>
          <a href="#Projects" className="cursor-pointer hover:text-gray-400">Projects</a>
          <a href="#Testimonials" className="cursor-pointer hover:text-gray-400">Testimonials</a>
        </ul>

        {/* Signup / Logout button */}
        {!session ? (
          <a
            href="/signup"
            className="hidden md:block bg-white px-8 py-2 rounded-full cursor-pointer"
          >
            Signup
          </a>
        ) : (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-500 text-white px-8 py-2 rounded-full cursor-pointer"
          >
            Logout
          </button>
        )}

        {/* Mobile menu icon */}
        <img
          onClick={() => setShowMobileMenu(true)}
          src={assets.menu_icon}
          className="md:hidden w-7 cursor-pointer"
          alt="menu"
        />
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          ShowMobileMenu ? "fixed w-full" : "h-0 w-0"
        } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-end p-6 cursor-pointer">
          <img
            onClick={() => setShowMobileMenu(false)}
            src={assets.cross_icon}
            className="w-6"
            alt="close"
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a onClick={() => setShowMobileMenu(false)} href="#Header">Home</a>
          <a onClick={() => setShowMobileMenu(false)} href="#About">About</a>
          <a onClick={() => setShowMobileMenu(false)} href="#Projects">Projects</a>
          <a onClick={() => setShowMobileMenu(false)} href="#Testimonials">Testimonials</a>
        </ul>

        {/* Mobile Signup / Logout */}
        <div className="flex justify-center mt-6">
          {!session ? (
            <a
              href="/signup"
              className="bg-black text-white px-8 py-2 rounded-full"
            >
              Signup
            </a>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-8 py-2 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
