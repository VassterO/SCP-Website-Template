import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } } };
const contentVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

function NotFound() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-full text-center px-4"
            variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }}
        >
            <motion.h1 className="font-black text-6xl sm:text-8xl text-primary" variants={contentVariants}>
                404
            </motion.h1>
            <motion.p className="font-bold text-lg sm:text-xl mb-8 text-text-light" variants={contentVariants}>
                Página no encontrada
            </motion.p>
            <motion.div variants={contentVariants}>
                <Link to="/" className="btn-primary">
                    Volver al inicio
                </Link>
            </motion.div>
        </motion.div>
    );
}

export default NotFound;