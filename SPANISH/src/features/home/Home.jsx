import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { homeConfig } from '../../config/homeConfig';
import { FaDiscord } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { opacity: 1, transition: { type: "spring", stiffness: 100 } } };

const buttonIcons = {
    discord: <FaDiscord size="1.2em" />,
    info: <IoIosInformationCircle size="1.2em" />,
    default: null
};

const ActionButton = ({ text, link, type, variant, icon }) => {
    const MotionComponent = type === 'external' ? motion.a : motion(Link);
    const props = type === 'external' ? { href: link, target: "_blank", rel: "noopener noreferrer" } : { to: link };
    const buttonClass = variant === 'secondary' ? 'btn-secondary' : 'btn-primary';

    return (
        <MotionComponent className={buttonClass} {...props} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* Búsqueda segura del icono con un fallback para evitar crasheos. */}
            {buttonIcons[icon] || buttonIcons.default}
            <span>{text}</span>
        </MotionComponent>
    );
};

function Home() {
    return (
        <motion.div
            className="flex-grow flex flex-col items-center justify-center text-center"
            variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }}
        >
            <div className="container mx-auto px-4 w-full">
                <motion.h1
                    className="font-black text-4xl sm:text-6xl lg:text-7xl mb-4 text-text-light"
                    style={{ textShadow: '0 0 15px rgba(239, 68, 68, 0.4)' }}
                    variants={itemVariants}
                >
                    {homeConfig.title}
                </motion.h1>
                <motion.p
                    className="mb-8 text-text text-lg md:text-xl max-w-2xl mx-auto"
                    variants={itemVariants}
                >
                    {homeConfig.description}
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                    variants={itemVariants}
                >
                    {homeConfig.buttons.map((button, index) => (
                        <ActionButton key={index} {...button} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Home;