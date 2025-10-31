
import { useTheme } from './hook/useTheme';

import Header from './blocks/Header';
import Hero from './blocks/Hero';
import Education from './Blocks/Education';
import Stack from './Blocks/Stack';
import Projects from './Blocks/Projects';
import Contact from './Blocks/Contact';
import Footer from './blocks/Footer';

// --- Main App Component ---
export default function App() {
  const [theme, toggleTheme] = useTheme();

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
