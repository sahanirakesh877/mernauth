import axios from 'axios';
import React, { useState } from 'react';

const MulterUpload = () => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const uploadImage = async () => {
        try {
            // Check if a file is selected
            if (!file) {
                console.error("No file selected");
                return;
            }

            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('image', file);

            // Make a POST request to your server endpoint
            const response = await axios.post("http://localhost:5173/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Image uploaded:', response.data);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Preview the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
        <div>
           
            {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
            )}
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadImage} className='btn bg-green-400 px-4 py-2 my-5'>Upload Image</button>
        </div>
    );
};

export default MulterUpload;
