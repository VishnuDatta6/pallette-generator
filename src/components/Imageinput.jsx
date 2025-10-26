import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/appContext';

const Imageinput = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState(null);
    const { uploadedImage, setUploadedImage, setToaster, setCentroids } = useContext(AppContext);
    const fileRef = useRef(null);
    function clearImage() {
        setImageUrl('');
        setImage(null);
        setUploadedImage(null);
        fileRef.current.value = null;
        setCentroids([]);
    }

    useEffect(() => {
        if (image) {
            const imageObject = new Image();
            imageObject.src = URL.createObjectURL(image);
            imageObject.onload = () => {
                setUploadedImage(imageObject);
            }
            imageObject.onerror = () => {
                setToaster({ message: 'Error loading image, please check the image file', type: 'error', duration: 3000, show: true });
            }
        }
        if (imageUrl) {
            const image = new Image();
            image.src = imageUrl;
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                setUploadedImage(image);
            }
            image.onerror = () => {
                setToaster({ message: 'Error loading image, please check the image URL', type: 'error', duration: 3000, show: true });
            }
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image, imageUrl]);

    return (
        <div className="image-input grid gap-6 w-full" >
            <div className="w-full bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border-2 border-gray-300">
                {uploadedImage ? (<img src={uploadedImage.src} alt='Uploaded' className='' />) : (
                    <div className='text-gray-500 h-64 md:h-96 text-sm text-center flex items-center justify-center'><span>Image Preview</span></div>
                )}
            </div>
            <div className='input-options'>
                <div className='user-upload grid grid-flow-row gap-2 md:gap-4'>
                    <label htmlFor="image-input" className='text-gray-700 font-semibold'>Upload Image</label>
                    <input ref={fileRef} type="file" className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-200 file:text-orange-700 hover:file:bg-orange-400' accept="image/*" id="image-input" disabled={Boolean(imageUrl)} onChange={(e) => setImage(e.target.files[0])} />
                    <button className='font-bold w-24 px-4 py-2 text-sm border border-gray-500 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-700 hover:border-2 transition-colors' onClick={clearImage}>Clear</button>
                </div>
                <h3 className='flex flex-row items-center text-gray-500 justify-center after:content-["_"] after:block after:w-full after:h-0.5 after:bg-gray-500 before:content-["_"] before:block before:w-full before:h-0.5 before:bg-gray-500'>OR</h3>
                <div className='url-input'>
                    <label htmlFor="image-url" className='text-gray-700 font-semibold'>Enter Image URL</label>
                    <input type="text" className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-orange-500 block w-full rounded-md sm:text-sm focus:ring-1' placeholder="Enter Image URL" disabled={Boolean(image)} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
            </div>
        </div>
    );

};

export default Imageinput;