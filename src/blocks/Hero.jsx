import Section from "./Section";
import profile from '../assets/cat.jpg'
import { Mouse } from "lucide-react";

// --- Hero Component ---
const Hero = () => {

  const buttonText = "Discover More"
  const whoYouAre = `not Why but When?`

  const firstName = 'Shihabe '
  const lastName = 'Shangvi'

  return (
      <section id="hero" className="py-12 border-left border-purple md:py-18">   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            <h1 className="text-5xl md:text-6xl text-gray-900 dark:text-white leading-tight">
              Hi!
              <br />
              My Name is
              <br />
              <span className="text-purple-700  dark:text-purple-400 animate- ">{firstName} {lastName}</span>
              <span className="text-purple-700  dark:text-purple-400 animate-pulse">|</span>
            </h1>
            <p className="text-md flex flex-col text-gray-900 dark:text-gray-300">
              <span className="bg-slate-100 text-red-700 dark:bg-gray-800 border border-white dark:border-gray-900 ps-2">{`<code>`}</span>
              <span className="bg-sky-100 border-b-0 border-t-0 dark:bg-gray-700 border border-white ps-8 dark:border-gray-900">{whoYouAre}</span>
              <span className="bg-slate-100 text-red-700 dark:bg-gray-800 border border-white dark:border-gray-900 ps-2">{`<code/>`}</span>
            </p>
            <div>
              <a
                href="#projects"
                className=" inline-block px-8 py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center">
                  <span>{buttonText}</span>
                  <span className="animate-pulse text-2xl ps-2"> {`>>>`} </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content (Circle) */}
          <div className="relative flex items-center justify-center h-120 md:h-120 ">
            {/* Outer Circle */}
            <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full  border-4 border-orange-500 " />
            {/* Inner Circle */}
            <div className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full border-0 border-purple-500 dark:border-purple-600" />
            {/* Text */}
            {/* Placeholder for image or inner content */}
            <img src={profile} alt='pp' className=" w-60 h-60 md:w-80 md:h-80  rounded-full bg-white dark:bg-[#171F30]" />
          </div>
        </div>   
      </section>
  );
};

export default Hero;