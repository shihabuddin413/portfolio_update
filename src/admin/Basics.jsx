import { useState } from 'react'
import {XCircle, RefreshCcw, LucideSave} from 'lucide-react'
import { doc, getDoc, updateDoc  } from "firebase/firestore"; 
import { db } from "../firebase";  
import  EditHeader from './EditHeader'
import EditHero from "./EditHero";


const Basics = () =>{

    const [activeSec, setActiveSec] = useState(0)

    const sections=[0,1,2,3,4,5,6,7,8]
    const secItems = [
        'Welcome',
        'Header',
        'Hero',
        'Stacks',
        'Projects',
        'Education',
        'Social Links',
        'Contacts',
        'Footer'
    ]

    const changeSection =(number)=>{
        console.log('clicked change section', number)
        setActiveSec(number)
    }

    const sectionList = () => {

        return (
            <div>
                <p className='ff pt-4'>Edit Sections </p>
                <ul className='flex py-4'> 
                 { 
                    sections.map ((item, idx)=>
                           <li className={` border-4  text-3xl px-4 py-2 ${item == activeSec ? ' border-green-500 text-green-500 ':'bg-gray-100 border-gray-100'} me-1 rounded ff`} 
                               style={{cursor:'pointer'}}
                               key={idx}
                               onClick={()=>changeSection(item)}
                               >
                                {item}
                                <span className={`block text-lg ff ${item == activeSec ? 'animate-pulse': ''}`}>{secItems[item]}</span>
                            </li>
                    )
                 }
                </ul>
            </div>
        )
    }


    const editTopBar = ()=> {
        return (
            <div>
                <h1 className='ff text-xl'>Hey Welcome ! <br/> No configuration needed yet! </h1>
            </div>
        )
    }

    const editHero = () => {

    }

    const getCurrentEditView = (num) => {
        if (num == 0) return editTopBar()
        else if (num == 1) return <EditHeader />
        else if (num == 2) return <EditHero/>
    }

    return (
        <div className="mt-2 p-6  rounded-lg bg-white dark:bg-gray-800 mx-2">
            <div className='flex flex-col space-y-4 justify-between items-left mb-6'>

                <span className="text-4xl font-bold text-gray-600 ff">Admin Panel</span>
                        

                <div>   
                    {sectionList()}                 
                </div>
            </div>

            <div>
                {getCurrentEditView(activeSec)}
            </div>
        </div>

    )
}

export default Basics;