import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { adaptFontSize, adaptSpacing, adaptContainerWidth, isMobile } = useScreenAdapter();

    const menuItems = ['Inicio', 'Servidor', 'Donaciones', 'Normativas'];

    // Animation for the navbar
    const navbarAnimation = {
        initial: { y: -100 },
        animate: { y: 0 },
        transition: { type: "spring", stiffness: 300, damping: 30 }
    };

    return (
        <motion.nav
            {...navbarAnimation}
            className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-70 z-50"
            style={{ padding: adaptSpacing(16) }}
        >
            <div style={{
                maxWidth: adaptContainerWidth(),
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Logo / Server Name */}
                <Link to="/" style={{ fontSize: adaptFontSize(24) }} className="font-bold text-red-500 hover:text-red-400 transition-colors">
                    El nombre de tu servidor
                </Link>

                {/* Mobile Menu Button or Desktop Menu Items */}
                {isMobile ? (
                    <MobileMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                ) : (
                    <DesktopMenuItems items={menuItems} adaptFontSize={adaptFontSize} />
                )}
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobile && isMenuOpen && (
                    <MobileMenuDropdown items={menuItems} adaptFontSize={adaptFontSize} onItemClick={() => setIsMenuOpen(false)} />
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

// Helper Components
const MobileMenuButton = ({ isOpen, onClick }) => (
    <button onClick={onClick} className="text-white focus:outline-none">
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
            ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            )}
        </svg>
    </button>
);

const DesktopMenuItems = ({ items, adaptFontSize }) => (
    <ul className="flex space-x-6">
        {items.map((item, index) => (
            <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                    className="text-white hover:text-red-500 transition-colors"
                    style={{ fontSize: adaptFontSize(16) }}
                >
                    {item}
                </Link>
            </motion.li>
        ))}
    </ul>
);

const MobileMenuDropdown = ({ items, adaptFontSize, onItemClick }) => (
    <motion.div
        className="absolute top-full left-0 right-0 bg-gray-900 bg-opacity-90"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
    >
        <ul className="flex flex-col items-center py-4">
            {items.map((item, index) => (
                <motion.li
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="my-2"
                >
                    <Link
                        to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                        className="text-white hover:text-red-500 transition-colors"
                        onClick={onItemClick}
                        style={{ fontSize: adaptFontSize(16) }}
                    >
                        {item}
                    </Link>
                </motion.li>
            ))}
        </ul>
    </motion.div>
);

export default Navigation;