import React from 'react';
import { motion } from 'framer-motion';

const Rules = () => {
    // Example rule structure
    const serverRules = [
        // { id: 1, text: "Está prohibido el acoso, toxicidad, faltas de respeto o hablar de cualquier tema religioso, polémico o político", punishment: "2D de ban o Permaban" },
    ];

    // Animations for the container
    const pageAnimation = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Animate children with a slight delay between each
            }
        }
    };

    // Animations for individual items
    const itemAnimation = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-8"
            initial="hidden"
            animate="visible"
            variants={pageAnimation}
        >
            <motion.h1
                className="text-4xl font-bold mb-6 text-red-500 text-center"
                variants={itemAnimation}
            >
                Normativa del servidor
            </motion.h1>
            <motion.div
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                variants={itemAnimation}
            >
                <ol className="space-y-4">
                    {serverRules.map(rule => (
                        <motion.li
                            key={rule.id}
                            className="border-b border-gray-700 pb-4 last:border-b-0"
                            variants={itemAnimation}
                        >
                            <span className="font-semibold text-yellow-400">{rule.id}. </span>
                            {rule.text}
                            <span className="text-red-500 font-semibold ml-2">({rule.punishment})</span>
                        </motion.li>
                    ))}
                </ol>
            </motion.div>
        </motion.div>
    );
};

export default Rules;