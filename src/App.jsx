
import { useTheme } from './hook/useTheme';

import Basics from './admin/Basics';
import Header from './blocks/Header';
import Hero from './blocks/Hero';
import Education from './blocks/Education';
import Stack from './blocks/Stack';
import Projects from './blocks/Projects';
import Contact from './blocks/Contact';
import Footer from './blocks/Footer';

import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc  } from "firebase/firestore"; 
import { db } from "./firebase";  

// --- Main App Component ---
export default function App() {

  const [theme, toggleTheme] = useTheme();

  const [status, setStatus] = useState(false)

  const [tsv, setTsv] = useState(true)

  const [tsvBtnTxt, setTsvBtnTxt] = useState('Turn off visibility')

  const handleHideAdmin = async () => {
    try {
      const statusRef = doc(db, "showadmin", "status"); // collection: showadmin, document: status
      await updateDoc(statusRef, {
        show: !status
      });
      setStatus(!status)
      console.log('status is : ', status)
      // alert("Admin hidden successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const docRef = doc(db, "showadmin", "status"); 
        const docSnap = await getDoc(docRef);

        console.log(docSnap)

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data.show)
          if (data.show) setStatus(data.show); 
        }
        
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);


  const EditMode = ({n, container}) =>{
    return (
      <div className={` ${n == 0? 'm-4': 'mt-12'}  p-4 border border-2 border-dashed border-blue-700 dark:border-red-300`}>
        <div className=' bg-sky-50  dark:bg-sky-900'>
          <div>
            <p className='ff bg-red-50 text-red-700 ps-2'>Edit mode</p>
          </div>
          <div className='flex items-center bg-red-100 py-2 border border-red-600 ps-2'>
            <span className='text-sm text-red-700 ff me-1'>section </span>
            <span className='text-md text-red-100 text-center 
          ff h-6 w-6 rounded bg-red-500 rounded-full'>{n}</span>
          </div>

          <div className='p-8'>
            {container}
          </div>   
        </div>
      </div>
    )
  }


  const turnoffVisv = () => {
    setTsv(!tsv)
    setTsvBtnTxt (tsv ? 'Turn on visibility' : 'Turn off visibility')
  }
 

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120] text-gray-700 dark:text-gray-300 font-sans transition-colors duration-300">
     
      {tsv == false ? 
          (
            status == false ? <Header theme={theme} onToggleTheme={toggleTheme} /> : ''
          )
          :(
          status ?
            <EditMode n={1} container={<Header theme={theme} onToggleTheme={toggleTheme} />} /> 
            :
            <Header theme={theme} onToggleTheme={toggleTheme} />
          )
      }

      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* edit mode button with 'basics' component 
        you can disable it through comments */}

        {status == 0 ? 
            <button 
              className='p-1 text-sm font-bold px-4 bg-gray-400 text-gray-400 ff hover:bg-gray-500 hover:text-gray-100' 
              onClick={handleHideAdmin}> Edit? </button>
              :
              <button className='p-1 ff bg-gray-50 px-4 hover:bg-gray-300 rounded' 
                       onClick={()=>turnoffVisv()}>{tsvBtnTxt}</button>
        }


        {status ? <Basics hideFunc={handleHideAdmin} /> : ''}
        {/* main portoflio */}


      <>
        {status ? (
          <>
            {tsv ?
              <>
                <EditMode n={2} container={<Hero />} />
                <EditMode n={3} container={<Stack />} />
                <EditMode n={4} container={<Education />} />
                <EditMode n={5} container={<Projects />} />
                <EditMode n={6} container={<Contact />} />
              </>: ''
            }
          </>
        ) : (
          <>
            <Hero />
            <Stack />
            <Education />
            <Projects />
            <Contact />
          </>
        )}
      </>
        
      </main>
      { !status ? <Footer /> :''}
    </div>
  );
}
