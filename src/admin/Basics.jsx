import { useState } from 'react'
import {XCircle, RefreshCcw, LucideSave} from 'lucide-react'
import { doc, getDoc, updateDoc  } from "firebase/firestore"; 
import { db } from "../firebase";  
import {refresh} from '../helpers/common'
import  {EditHeader} from './EditHeader'


const Basics = ({hideFunc}) =>{

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
                           <li className={`px-4 ${item == activeSec ? 'bg-red-500 text-white':'bg-gray-100'} py-2 me-1 rounded-full ff`} 
                               style={{cursor:'pointer'}}
                               key={idx}
                               onClick={()=>changeSection(item)}
                               >
                                {item}
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
                <h1 className='ff text-xl'>No configuration needed yet!</h1>
            </div>
        )
    }

    const editHero = () => {

    }

    const getCurrentEditView = (num) => {
        if (num == 0) return editTopBar()
        else if (num == 1) return <EditHeader />
        else if (num == 2) return editHero()
    }

    return (
        <div className="mt-12 p-6 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 shadow-md mx-2">
            <div className='flex flex-col space-y-4 justify-between items-left mb-6'>

                <span className="text-lg font-bold text-gray-600 ff">Admin Panel</span>
                            
                <div className='flex space-x-2 '>
                    <button onClick={()=>hideFunc()} 
                        className='ff text-md bg-red-500 shadow flex items-center rounded py-2 px-4 text-white hover:bg-red-800'>
                            Hide <XCircle className='ms-1' size={15}/> 
                        </button>
                    <button onClick={()=>refresh()} 
                        className='ff text-md bg-blue-400 shadow flex items-center rounded p-1 px-2 text-white hover:bg-sky-900'>
                            Refresh <RefreshCcw className='ms-1' size={15}/> 
                        </button>
                    
                    
                </div>

                <div>   
                    {sectionList()}
                    <p className="text-sm 
                        font-medium 
                        mb-2 
                        bg-gray-200 
                        ps-2 
                        text-gray-700 
                        ff border-b">Edit {secItems[activeSec]} </p>
                   
                </div>
            </div>

            <div>
                {getCurrentEditView(activeSec)}
            </div>
        </div>

    )
}

export default Basics;