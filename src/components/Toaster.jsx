import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/appContext';

const Toaster = () => {
    const { toaster, setToaster } = useContext(AppContext);
    useEffect(() => {
        if (toaster.show) {
            setTimeout(() => {
                setToaster({ ...toaster, show: false });
            }, toaster.duration);
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toaster.show]);
    return (
        <div className={`toaster ${toaster.show ? 'block' : 'hidden'} absolute top-8 mx-auto right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 rounded-lg animate-fade-in`}>
            <div className={`toaster-content flex gap-2 items-center p-4 ${toaster.type === 'info' ? 'bg-blue-400' : toaster.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}>
                <h3 className={`text-white font-bold`}>{toaster.message}</h3>
                <button className='text-white font-bold' onClick={() => setToaster({ ...toaster, show: false })}>×</button>
            </div>
        </div>
    );
};

export default Toaster;