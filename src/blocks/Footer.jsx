// --- Footer Component ---



const Footer = () => {

  const urls = {
    github:'https://github.com/shihabuddin413',
    facebook:'https://www.facebook.com/i.am.shihabe',
    in:'https://www.linkedin.com/in/Shihabe%20Uddin',
    x:'https://x.com/merts38900'
  }

  return (
  <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
    
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-gray-600 dark:text-gray-500">
        Copyright 2021-2025 @Shihabe uddin
      </p>
    </div>
  </footer>)
};

export default Footer;