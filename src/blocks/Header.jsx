// --- Header Component ---

import {Sun, Moon, Menu, X} from 'lucide-react'

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";  

const Header = ({ theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [navLinks, setNavLinks] = useState([
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]);

  const [shortName, setShortName] = useState("SS");

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const docRef = doc(db, "header", "config"); // collection: header, document: config
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.navLinks) setNavLinks(data.navLinks);   // Update navLinks
          if (data.shortName) setShortName(data.shortName); // Update shortName
        }
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);



  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-5xl text-gray-900 dark:text-white">
          {shortName}<span className='text-purple-500'>.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name} 
              href={link.href}
              className="text-lg bg-purple-400 py-1 px-4 rounded font-medium text-white dark:text-gray-900 hover:text-black dark:hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-gray-100 text-gray-700 dark:bg-purple-300  hover:bg-purple-200 dark:hover:bg-purple-200 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>



        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 mr-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0B1120] shadow-lg py-4">
          <div className="flex flex-col items-center space-y-4 ">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg border-b border-gray-500 hover:border-purple-500 font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;