import { createContext, useState } from 'react';

const AppContext = createContext();


const ContextProvider = ({ children }) => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [centroids, setCentroids] = useState([]);
    const [toaster, setToaster] = useState({
        message: 'This is a test toaster message with a duration of 3 seconds',
        type: 'info',
        duration: 3000,
        show: false,
    });


    let appState = {
        uploadedImage,
        setUploadedImage,
        centroids,
        setCentroids,
        toaster,
        setToaster,
    }
    return (
        <AppContext.Provider value={appState}>
                {children}
        </AppContext.Provider>
    );
};

export { AppContext, ContextProvider };
