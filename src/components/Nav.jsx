import { Home, Info } from 'lucide-react';
import React from 'react';

const Nav = () => {
    return (
        <div className="nav bg-white shadow-2xl w-full h-20 p-4 md:p-6 grid grid-flow-1 md:grid-cols-3 gap-8">
            <div className='md:col-span-3 flex justify-between items-center'>
                <div className='flex items-center text-xl font-semibold text-gray-800'>
                    <span className='text-orange-500 mr-2'>🎨</span> Palette Extractor
                </div>
                <nav className='hidden md:flex space-x-6 text-gray-600'>
                    <a href='/' className='hover:text-gray-900 flex items-center'><Home className='w-4 h-4 mr-1' /> Home</a>
                    <a href='/' className='hover:text-gray-900 flex items-center'><Info className='w-4 h-4 mr-1' /> About</a>
                </nav>
            </div>
        </div>
    );
};

export default Nav;
