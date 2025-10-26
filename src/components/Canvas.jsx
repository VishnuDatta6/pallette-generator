import React, { useContext, useState } from 'react';
import { AppContext } from '../context/appContext';
import { kmeans } from '../lib/kmeans';
import { LoaderCircle } from 'lucide-react';

const Canvas = () => {
    const { uploadedImage, centroids, setCentroids, setToaster } = useContext(AppContext);
    const [paletteNumber, setPaletteNumber] = useState(4);
    const [isProcessing, setIsProcessing] = useState(false);
    let nCentroids = 4;
    function processImage() {
        if (!uploadedImage) {
            setToaster({ message: 'Please upload an image first', type: 'error', duration: 3000, show: true });
            return;
        }
        if (paletteNumber < 4 || paletteNumber > 10) {
            setToaster({ message: 'Please enter a number between 4 and 10', type: 'info', duration: 3000, show: true });
            return;
        }
        setIsProcessing(true);
        nCentroids = paletteNumber;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const pixels = [];
        for (let i = 0; i < data.length; i += 4) {
            pixels.push([data[i], data[i + 1], data[i + 2]]);
        }
        const centroids = kmeans(pixels, paletteNumber);
        setCentroids(centroids);
        setIsProcessing(false);
    }

    return (
        <div className="canvas">
            <canvas id="canvas" className='absolute invisible' />
            <div className='process-options grid grid-flow-row gap-2 md:gap-4'>
                <button className='px-4 py-2 font-bold text-sm border border-gray-500 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-700 hover:border-2 transition-colors' onClick={processImage}>
                    {isProcessing ? (<span className='flex items-center gap-2'><LoaderCircle className='animate-spin' />Processing...</span>): (<span>Process Image</span>)} 
                    </button>
                <label htmlFor='palette-number' className='text-gray-700 font-semibold flex'><span>Enter Number of Colors</span></label>
                <span>Default: 4</span>
                <input type='number' min='4' max='10' value={paletteNumber} onChange={(e) => setPaletteNumber(e.target.value)} className='w-64  mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-orange-500 block w-full rounded-md sm:text-sm focus:ring-1' />
            </div>
            {centroids.length > 0 && (
                <div className='color-palette-container mt-4 md:mt-8'>
                    <h1 className='text-2xl font-bold text-gray-700'>Color Palette</h1>
                    <div className="color-palette flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-6">
                        {centroids.map((centroid, index) => (
                            <div key={index} className={`color-box w-28 h-28 ${nCentroids > 6 ? 'md:w-32 md:h-32' : 'md:w-44 md:h-44'} text-white md:font-bold text-xs md:text-base flex items-center justify-center border-2 border-gray-300 rounded-lg drop-shadow-xl`} style={{ backgroundColor: `rgb(${centroid[0]}, ${centroid[1]}, ${centroid[2]})` }}><span className='shadow-2xl'> RGB({centroid[0]}, {centroid[1]}, {centroid[2]}) </span></div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};  

export default Canvas;