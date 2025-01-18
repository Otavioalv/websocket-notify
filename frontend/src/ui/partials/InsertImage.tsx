import React, { ChangeEvent, useState } from 'react'
import { uploadMessageService } from '../../data/services/WebsocketService';

export default function InsertImage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    }

    const handleUpload = async () => {
        await uploadMessageService(selectedFile);
    }

    return (
        <div className='text-white'>
            <p>insira uma imagem</p>

            <input type="file" accept='.png, .jpeg, .jpg' onChange={handleFileChange}/>
            
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}

