
import Section from "./Section";
// --- Education Section ---

const EducationCard = ({ title, field, institution, years }) => (
  <div className="p-8 bg-gray-50 dark:bg-[#171F30] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
    <h3 className="text-2xl font-bold text-purple-500 dark:text-purple-400 mb-2">
      {title}
    </h3>
    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
      {field}
    </h4>
    <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">{institution}</p>
    <p className="text-md text-gray-600 dark:text-gray-500">{years}</p>
  </div>
);

const Education = () => {
  const educationData = [
    {
      title: 'Bachelor of Science',
      field: 'Computer Science',
      institution: 'University Name',
      years: '2020 - 2024',
    },
    {
      title: 'Diploma',
      field: 'Web Development',
      institution: 'Technical Institute',
      years: '2019 - 2020',
    },
  ];

  return (
    <Section id="education" title="Education">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educationData.map((edu, index) => (
          <EducationCard key={index} {...edu} />
        ))}
      </div>
    </Section>
  );
};

export default Education;