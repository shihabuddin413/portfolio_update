import { useTheme } from './hook/useTheme';

import Basics from './admin/Basics';
import Header from './blocks/Header';
import Hero from './blocks/Hero';
import Education from './blocks/Education';
import Stack from './blocks/Stack';
import Projects from './blocks/Projects';
import Contact from './blocks/Contact';
import Footer from './blocks/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "./firebase";  

export default function App() {

  const [theme, toggleTheme] = useTheme();
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const docRef = doc(db, "showadmin", "status"); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.show) setStatus(data.show); 
        }
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  // --- Portfolio Page Component ---
  function PortfolioApp() {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0B1120] text-gray-700 dark:text-gray-300 font-sans transition-colors duration-300">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Stack />
          <Education />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioApp />} />
        <Route path="/admin" element={<Basics />} />
      </Routes>
    </Router>
  );
}
