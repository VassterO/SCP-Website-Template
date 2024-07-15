import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, delay: 0.2 } }
};

function NotFound() {
    const { adaptFontSize } = useScreenAdapter();
    const [styles, setStyles] = useState({});

    useEffect(() => {
        setStyles({
            title: { fontSize: adaptFontSize(36) },
            text: { fontSize: adaptFontSize(18) },
            button: { fontSize: adaptFontSize(16) }
        });
    }, [adaptFontSize]);

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.h1 className="text-4xl font-bold mb-4" variants={contentVariants} style={styles.title}>
                404 - Página no encontrada
            </motion.h1>
            <motion.p className="text-xl mb-8" variants={contentVariants} style={styles.text}>
                La página que estás buscando no existe.
            </motion.p>
            <motion.div variants={contentVariants}>
                <Link
                    to="/"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    style={styles.button}
                >
                    Volver al inicio
                </Link>
            </motion.div>
        </motion.div>
    );
}

export default NotFound;