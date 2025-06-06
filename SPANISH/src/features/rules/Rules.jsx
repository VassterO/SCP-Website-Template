import React from 'react';
import { motion } from 'framer-motion';
import { rulesConfig } from '../../config/rulesConfig';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } } };

const RuleItem = ({ rule }) => (
    <motion.li
        variants={itemVariants}
        className="border-b border-border pb-4 last:border-b-0"
        whileHover={{ scale: 1.02, x: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
        <p className="text-base leading-relaxed">
            <span className="font-bold text-accent mr-2">{rule.id}.</span>
            <span className="text-text">{rule.text}</span>
            <span className="text-primary font-mono text-sm ml-2">({rule.punishment})</span>
        </p>
    </motion.li>
);

const Rules = () => {
    return (
        <motion.div
            className="container mx-auto px-4 py-16 md:py-24 flex-grow flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
        >
            <motion.h1
                className="font-black text-center mb-12 text-3xl sm:text-4xl md:text-5xl text-text-light"
                variants={itemVariants}
            >
                {rulesConfig.title}
            </motion.h1>
            <motion.div
                className="bg-background-light rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-4xl mx-auto border border-border"
                variants={itemVariants}
            >
                <ol className="space-y-6">
                    {rulesConfig.rules.map(rule => (
                        <RuleItem key={rule.id} rule={rule} />
                    ))}
                </ol>
            </motion.div>
        </motion.div>
    );
};

export default Rules;