
import {LucideSave} from 'lucide-react'
import { doc, getDoc, updateDoc  } from "firebase/firestore"; 
import { db } from "../firebase";  
import { useEffect, useState } from 'react';


export const EditHeader=()=> {

    const [shortName, setShortName] = useState('')
    const [links, setLinks] = useState('[]')

    useEffect(() => {
        const fetchHeaderData = async () => {

            const docRef = doc(db, "header", "config");

            try {
                const docSnap = await getDoc(docRef);
                const data = docSnap.data();
                console.log("Header data:", data);
                setShortName(data.shortName)
                setLinks(JSON.stringify(data.navLinks, null, 2));
            } catch (err) {
                console.error("Error fetching header data:", err);
            }
        
        };

        fetchHeaderData();
    }, []);



    async function updateInfo () {

        try {
            // textarea থেকে valid JSON বানানো
            const parsedLinks = JSON.parse(links);

            const docRef = doc(db, "header", "config");

            await updateDoc(docRef, {
                shortName,
                navLinks: parsedLinks,
            });
            alert("✅ Header updated successfully!");
        }
        catch (err) {
            alert("❌ Invalid JSON format!");
            console.error(err);
        }
        
    }

    return (
        <div className="">

            <button onClick={()=>updateInfo()} 
                    className='ff text-md bg-teal-500 shadow flex items-center rounded p-3 px-5 mb-12 text-white hover:bg-green-700'>
                    Save <LucideSave className='ms-1' size={20}/> 
            </button>

            <div className="pl-0 space-y-4">
            
                <div className="flex items-center justify-between">
                    <label className="w-1/4 text-sm text-gray-700 font-medium ff">Short Name:</label>
                    <input 
                        className="ff w-3/4 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400" 
                        type="text" 
                        value={shortName}
                        onChange={(e) => setShortName(e.target.value)}
                        placeholder="Enter short name"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="ff text-sm  w-1/4 text-gray-700 font-medium">Links:</label>
                    <textarea 
                        className="ff text-sm  w-3/4 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400" 
                        type="text" 
                        value={links}
                        onChange={(e) => setLinks(e.target.value)}
                        placeholder="Enter links"
                        rows={10}
                    />
                </div>

            </div>
        </div>
    )
 
}
