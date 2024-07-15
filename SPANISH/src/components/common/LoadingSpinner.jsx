import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <motion.div
            className="h-16 w-16 border-t-4 border-b-4 border-red-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    </div>
);

export default LoadingSpinner;