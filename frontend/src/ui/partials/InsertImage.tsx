import React, { ChangeEvent, useState } from 'react'
import { uploadImageService } from '../../data/services/WebsocketService';
import { useNavigate } from 'react-router-dom';
import { CiImageOn } from "react-icons/ci";




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
        <div className='text-white w-full h-full absolute flex justify-center items-center flex-col'>
            <input 
                type="file" 
                accept='.png, .jpeg, .jpg' 
                onChange={handleFileChange}
                id="file-input"
                className='hidden'
            />

            <label 
                htmlFor="file-input"
                className='
                    border
                    border-white
                    border-dashed
                    flex 
                    justify-center 
                    items-center 
                    flex-col
                    rounded
                    p-3
                    '
            >
                <CiImageOn className='w-72 h-72'/>
                <p>
                    Insira uma imagem
                </p>
            </label>
            
            <button 
                onClick={handleUpload}
                
            >
                Enviar
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