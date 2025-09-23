// src/App.jsx
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "./supabaseClient";

// pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// your existing components
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  const [session, setSession] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // If user not logged in -> show login or signup
  if (!session) {
    return (
      <>
        <ToastContainer />
        {showSignup ? (
          <Signup switchToLogin={() => setShowSignup(false)} />
        ) : (
          <Login onLoginSuccess={(s) => setSession(s)} switchToSignup={() => setShowSignup(true)} />
        )}
      </>
    );
  }

  // If logged in -> show main site
  return (
    <div className="w-full overflow-hidden">
      <ToastContainer />
      <Header />
      <About />
      <Projects />
      <Testimonial />
      <Contact />
      <Footer />

      
    </div>
  );
};

export default App;
