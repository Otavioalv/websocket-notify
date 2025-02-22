import React, { ChangeEvent, useState } from 'react'
import { uploadImageService } from '../../data/services/WebsocketService';
import { useNavigate } from 'react-router-dom';
import { CiImageOn } from "react-icons/ci";

// style de test
import '../styles/Message.css'

export default function InsertImage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    }

    const handleUpload = async () => {
        await uploadImageService(selectedFile, navigate);
    }



    return (
        <div className='text-white w-full h-full absolute flex justify-evenly items-center flex-col'>
            <input 
                type="file" 
                accept='.png, .jpeg, .jpg' 
                onChange={handleFileChange}
                id="file-input"
                className='hidden'
            />

            <label 
                htmlFor="file-input"
                className={`
                    bg-dashed-lg
                    flex 
                    justify-center 
                    items-center 
                    hover:bg-violet-900/40
                    transition-all
                    cursor-pointer
                    flex-col
                    rounded
                    p-6
                    w-full
                    md:w-2/3
                    md:h-96
                    max-h-96
                    ${selectedFile ? 'bg-violet-300/60' : ''}
                    `}
                style={{}}
            >
                <CiImageOn className='w-full h-full'/>
                <p className='text-3xl'>
                    Insira uma imagem
                </p>
            </label>
                
            <button 
                className={` p-3 w-full md:w-2/3 rounded z-10 transition-all ${selectedFile ? 'hover:bg-violet-700 bg-violet-600 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}`} 
                onClick={handleUpload}
                disabled={selectedFile ? true : false}
            >
                ENVIAR
            </button>
        </div>
    )
}


/* 

<input
        type="file"
        accept=".png, .jpeg, .jpg"
        onChange={handleFileChange}
        id="file-input"
        className="hidden"
      />
      
      <label
        htmlFor="file-input"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
      >
        Selecionar Arquivo
      </label>
*/