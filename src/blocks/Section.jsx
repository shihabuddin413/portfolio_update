// --- Section Wrapper Component ---
const Section = ({ title, subtitle, children, id }) => (
  <section id={id} className="py-20">
    <h2 className="text-4xl  md:text-5xl text-gray-400 dark:text-white mb-4">
      {title}
      <span className="text-purple-500">.</span>
    </h2>
    {subtitle && (
      <p className="text-lg text-gray-700 dark:text-gray-400 mb-12">
        {subtitle}
      </p>
    )}
    {children}
  </section>
);

export default Section;