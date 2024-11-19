'use client';

/**
|--------------------------------------------------
| npm imports
|--------------------------------------------------
*/
import { useState, useEffect } from 'react';

const MapPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Simulate loading time with a timeout
        const timer = setTimeout(() => {
            setIsLoading(false);
            setError(true); // Simulate an error
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }, []);

    return (
        <div className="flex flex-col items-center justify-center  h-full bg-gray-100">
            {isLoading ? (
                // Loading spinner
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    <p className="mt-4 text-gray-700">Loading Map...</p>
                </div>
            ) : error ? (
                // Error message
                <div className="text-center">
                    <p className="text-red-500 text-xl font-semibold">Something went wrong</p>
                    <p className="text-gray-600 mt-2">We{` couldn't`} load the map at this time.</p>
                </div>
            ) : (
                // If there was no error, display the map (this is a placeholder)
                <div>
                    <p>Map Loaded!</p>
                </div>
            )}
        </div>
    );
};

export default MapPage;
