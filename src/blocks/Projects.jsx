// --- Projects Section ---
import Section from "./Section";
import {ExternalLink } from 'lucide-react'
import cat from '../assets/cat.jpg';

const ProjectCard = ({ number, title, description, link }) => (


  <div className="flex flex-col bg-gray-50 dark:bg-[#171F30] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    {/* Image Placeholder */}
    <div 
        className="h-64 bg-gray-100 dark:bg-[#1E293B] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${cat})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
         
        }}
      >
      <span className="text-8xl font-bold text-yellow-300 dark:text-purple-200">
        {number}
      </span>
    </div>
    {/* Content */}
    <div className="p-8 flex-grow">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
        {description}
      </p>
    </div>
    {/* Footer Link */}
    <div className="p-8 pt-0">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-lg font-medium text-purple-500 dark:text-purple-400 hover:underline"
      >
        Visit Our Website
        <ExternalLink className="w-5 h-5 ml-2" />
      </a>
    </div>
  </div>
);

const Projects = () => {
  const projectData = [
    {
      number: 1,
      title: 'Sling Shoot Game',
      description: 'peaceful, and tranquil mean quiet and free from disturbance. calm is used when someone is not excited or upset even when there is cause for it. They stayed calm during the fire. peaceful is used whe...',
      link: '#',
    },
    {
      number: 2,
      title: 'Master Coding',
      description: 'A master tool built with code-mirror. Has some simple features such creating a file, save it, managing projects with a amazing and stylish User Interface. Not so old and not so new yet best to begin...',
      link: '#',
    },
    // Add more projects here
    // { number: 3, ... },
    // { number: 4, ... },
  ];

  return (
    <Section id="projects" title="Projects" subtitle="I have done">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectData.map((proj) => (
          <ProjectCard key={proj.number} {...proj} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;