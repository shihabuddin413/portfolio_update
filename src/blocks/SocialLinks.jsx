import { Github, Facebook, Twitter, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const icons = [
  { id: 1,
    icon: <Github size={120} strokeWidth={1.5} />, 
    iconName:'Github',
    iconColor:'text-gray-500 dark:text-gray-100',
    url:'https://github.com/shihabuddin413'
},
  { id: 2, 
    icon: <Facebook size={120} strokeWidth={1.5} />,
    iconName:'Facebook',
    iconColor:'text-blue-500 ',
    url:'https://www.facebook.com/i.am.shihabe'
  },
  { id: 3, 
    icon: <Twitter size={120} strokeWidth={1.5} />,
    iconName:'X (Twitter)',
    iconColor:'text-gray-500 dark:text-gray-200',
    url:'https://x.com/merts38900'
  },
  { id: 4, 
    icon: <Linkedin size={120} strokeWidth={1.5} />,
    iconName:'Linkedin',
    iconColor:'text-sky-500 ',
    url:'https://www.linkedin.com/in/Shihabe%20Uddin'
  },

];

export const SocialLinks = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 3000); // প্রতি ২ সেকেন্ডে icon বদলাবে
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
        <div>
            <p className="text-xl pb-1 text-purple-500">Find me on on ...</p>
        </div>
        <div className="relative flex items-center justify-center w-full h-48 
  bg-gradient-to-br from-gray-50 via-white to-gray-100
  dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
  rounded-3xl shadow-inner overflow-hidden">
        
        <AnimatePresence mode="exitBeforeEnter" initial={false} className='dark:bg-gray-900'>
            <motion.div
            key={icons[index].id}
            initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute will-change-transform"
            >
                <a href={icons[index].url} target="_blank">
                <motion.div
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className={`${icons[index].iconColor} p-6 flex justify-start items-center`}
                >
                    
                        <span>{icons[index].icon} </span>                
                        <span className="text-4xl" style={{fontFamily:'fantasy'}}>{icons[index].iconName}</span>
                    
                </motion.div>
                </a>
               
            </motion.div>
        </AnimatePresence>
        </div>
    </div>
  );
};
