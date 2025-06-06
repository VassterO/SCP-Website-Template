import React from 'react';
import { motion } from 'framer-motion';

/**
 * A reusable loading spinner.
 * @param {{size?: 'small' | 'medium' | 'large', className?: string}} props
 * - `size`: Controls the spinner size. Defaults to 'medium'.
 * - `className`: Allows passing additional classes for positioning.
 */
const LoadingSpinner = ({ size = 'medium', className = '' }) => {
    const sizeClasses = {
        small: 'h-6 w-6 border-2',
        medium: 'h-12 w-12 border-4',
        large: 'h-16 w-16 border-4',
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <motion.div
                className={`border-t-transparent border-b-transparent border-red-500 rounded-full ${sizeClasses[size]}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                aria-label="Cargando contenido"
                role="status"
            />
        </div>
    );
};

export default LoadingSpinner;