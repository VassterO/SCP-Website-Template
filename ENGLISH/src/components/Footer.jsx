import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            className="bg-gray-900 text-center py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-2xl font-bold text-red-500 mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Your Server Name
                </motion.h2>
                <motion.p
                    className="text-gray-400 mb-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Placeholder
                </motion.p>
                <motion.div
                    className="flex justify-center space-x-6 mb-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {/* # Must be replaced with actual links */}
                    <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Placeholder</a>
                    <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Placeholder</a>
                    <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Placeholder</a>
                </motion.div>
                <motion.p
                    className="text-gray-600 text-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {/* Enable only if you have copyright.
                        &copy; 2024 Your Server Name. All rights reserved.
                    */}
                </motion.p>
            </div>
        </motion.footer>
    );
};

export default Footer;
