import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationConfig } from '../../config/navigationConfig';
import { getNavigationItems } from '../../utils/helpers';

const MenuItem = ({ item, onClick }) => (
    <motion.li>
        <Link
            to={item.path}
            className="relative block px-3 py-2 text-text hover:text-text-light transition-colors"
            onClick={onClick}
        >
            {item.name}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
            />
        </Link>
    </motion.li>
);

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = getNavigationItems();

    const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    return (
        // THE FIX: Added z-50 to ensure the header always stays on top of page content.
        <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg z-50 border-b border-border">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="font-black text-2xl tracking-tighter text-text-light" onClick={closeMenu}>
                    {navigationConfig.title}<span className="text-primary">.</span>
                </Link>

                <ul className="hidden md:flex items-center gap-4" role="menubar">
                    {navItems.map((item) => <MenuItem key={item.path} item={item} />)}
                </ul>

                <button
                    onClick={toggleMenu}
                    className="md:hidden text-text-light p-2"
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-sm overflow-hidden"
                    >
                        <ul className="p-4" role="menu">
                            {navItems.map((item) => <MenuItem key={item.path} item={item} onClick={closeMenu} />)}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navigation;