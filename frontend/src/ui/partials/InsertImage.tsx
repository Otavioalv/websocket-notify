import React, { ChangeEvent, useState } from 'react'
import { uploadImageService } from '../../data/services/WebsocketService';
import { useNavigate } from 'react-router-dom';

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
        <div className='text-white'>
            <p>insira uma imagem</p>

            <input type="file" accept='.png, .jpeg, .jpg' onChange={handleFileChange}/>
            
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}
