import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const Home = () => {
    const { adaptFontSize, adaptSpacing } = useScreenAdapter();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center max-w-3xl mx-auto px-4">
                    <motion.h1
                        className="font-bold mb-4 text-red-500"
                        style={{ fontSize: adaptFontSize(48) }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Your Server Name
                    </motion.h1>
                    <motion.p
                        className="mb-6"
                        style={{ fontSize: adaptFontSize(18) }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Your server name, an English SCPSL server. Come and have fun with us for a while. Enjoy!
                    </motion.p>
                    <motion.div
                        className="space-x-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.a
                            href="https://discord.gg/your-discord-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition duration-300 ease-in-out"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ fontSize: adaptFontSize(16), padding: `${adaptSpacing(8)} ${adaptSpacing(16)}` }}
                        >
                            Join Discord
                        </motion.a>
                        <motion.div
                            className="inline-block"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/server"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition duration-300 ease-in-out"
                                style={{ fontSize: adaptFontSize(16), padding: `${adaptSpacing(8)} ${adaptSpacing(16)}` }}
                            >
                                Server Information
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;
