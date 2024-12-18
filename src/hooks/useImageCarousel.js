import { useState, useEffect } from 'react';

export const useImageCarousel = (images, interval = 3000) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length > 1) {
            const timer = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, interval);
            return () => clearInterval(timer);
        }
    }, [images.length, interval]);

    return { currentImageIndex };
};
