
import {XCircle, RefreshCcw, LucideSave} from 'lucide-react'

const Basics = ({hideFunc}) =>{

    const refresh= () => {
        window.location.reload()
    }

    return (
        <div className="mt-12 p-6 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 shadow-md mx-2">
            <div className='flex justify-between items-center mb-6'>
                <span className="text-md bg-gray-100 px-4 font-bold text-gray-600 ff">Admin Panel</span>
                
                <div className='flex space-x-2'>
                    <button onClick={()=>hideFunc()} 
                        className='ff text-xs bg-red-500 shadow flex items-center rounded p-1 px-2 text-white hover:bg-red-800'>
                            Hide <XCircle className='ms-1' size={15}/> 
                        </button>
                    <button onClick={()=>refresh()} 
                        className='ff text-xs bg-blue-400 shadow flex items-center rounded p-1 px-2 text-white hover:bg-sky-900'>
                            Refresh <RefreshCcw className='ms-1' size={15}/> 
                        </button>
                    
                    <button onClick={()=>refresh()} 
                        className='ff text-xs bg-teal-500 shadow flex items-center rounded p-1 px-2 text-white hover:bg-green-700'>
                            Save <LucideSave className='ms-1' size={15}/> 
                        </button>
                </div>
            </div>

            <div className="pl-4">
                <p className="text-sm font-medium mb-2 bg-gray-200 ps-2 text-gray-700 ff border-b">Edit Header</p>

                <div className="pl-0 space-y-4">
                
                    <div className="flex items-center justify-between">
                        <label className="w-1/4 text-sm text-gray-700 font-medium ff">Short Name:</label>
                        <input 
                        className="ff w-3/4 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400" 
                        type="text" 
                        placeholder="Enter short name"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="ff text-sm  w-1/4 text-gray-700 font-medium">Links:</label>
                        <textarea 
                        className="ff text-sm  w-3/4 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400" 
                        type="text" 
                        placeholder="Enter links"
                        />
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Basics;