

import Section from "./Section";

import { 
  Sun, 
  Moon, 
  Code, 
  Database, 
  FastForward, 
  FileCode, 
  Wind, 
  Mail, 
  ExternalLink, 
  Menu, 
  X,
  Server,
  Atom, // Using Atom for React
  Sparkles // Added for Gemini features
} from 'lucide-react';

const TechIcon = ({ name, className = "w-6 h-6" }) => {
  const iconProps = { className };
  switch (name.toLowerCase()) {
    case 'javascript':
      return <Code {...iconProps} />;
    case 'react':
      return <Atom {...iconProps} />;
    case 'node.js':
      return <Server {...iconProps} />;
    case 'mongodb':
      return <Database {...iconProps} />;
    case 'express':
      return <FastForward {...iconProps} />;
    case 'python':
      return <FileCode {...iconProps} />; // Using FileCode as a proxy for Python
    case 'c':
      return <FileCode {...iconProps} />; // Using FileCode as a proxy for C
    case 'tailwind css':
      return <Wind {...iconProps} />;
    default:
      return <Code {...iconProps} />;
  }
};



const TechnologyCard = ({ name }) => (
  <div className="flex  items-center space-x-4 p-6 bg-gray-50 dark:bg-[#171F30] rounded-lg shadow-md hover:shadow-lg  transition-shadow duration-300">
    <TechIcon name={name} className="w-8 h-8 text-purple-500 dark:text-purple-400" />
    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
      {name}
    </span>
  </div>
);


const Stack = () => {

  const whatYourToolsTitle='Technologies'

  const whatYourTools = [
    'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'Python', 'C', 'Tailwind CSS'
  ];

  const howYouDoIt = "What else rather than the most popular 'MERN' stack. I was wondered that these so many things could be done with help of Javascript, Oh! not actually with Javascript. But Node.js is really a amazing powerful runtime yet so many applications can be done and this portfolio is one of the demo of its very own,  popular front-end framework React. So, to build your dream project don't hesitate to make full use of Javascript."

  const sectionTitle = 'Stack I use'

  return (
    <Section id="stack" title={sectionTitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Description */}
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
          <p>
            {howYouDoIt}
          </p>
          <p>
            For any kind of paid task... 
            <a href="#contact" className="font-medium text-purple-500 dark:text-purple-400 hover:underline">
              Contact me!
            </a>
          </p>
        </div>
        
        {/* Right Column: Technologies Grid */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {whatYourToolsTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatYourTools.map((tech) => (
              <TechnologyCard key={tech} name={tech} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Stack;