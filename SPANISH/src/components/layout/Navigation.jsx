import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScreenAdapter } from '../../utils/ScreenAdapter';
import { navigationConfig } from '../../config/navigationConfig';
import { getNavigationItems, getRoutePath } from '../../utils/helpers';

const MenuItem = React.memo(({ item, onClick, fontSize, isMobile }) => (
    <motion.li
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={isMobile ? "my-2" : "mx-4"}
    >
        <Link
            to={getRoutePath(item.name)}
            className="text-white hover:text-red-500 transition-colors block py-2"
            onClick={onClick}
            style={{ fontSize }}
            aria-label={`Navigate to ${item.name}`}
        >
            {item.name}
        </Link>
    </motion.li>
));

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { adaptFontSize, adaptSpacing, isMobile, isBreakpoint } = useScreenAdapter();
    const navItems = getNavigationItems();

    const styles = useMemo(() => ({
        navbar: { padding: adaptSpacing(isBreakpoint('lg') ? 16 : 12) },
        title: { fontSize: adaptFontSize(isBreakpoint('lg') ? 24 : 20) },
        menuItem: { fontSize: adaptFontSize(isBreakpoint('lg') ? 16 : 14) }
    }), [adaptFontSize, adaptSpacing, isBreakpoint]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
        }
    }, [toggleMenu]);

    const renderMenuItems = useCallback((isMobile) =>
        navItems.map((item, index) => (
            <MenuItem
                key={index}
                item={item}
                onClick={isMobile ? closeMenu : undefined}
                fontSize={styles.menuItem.fontSize}
                isMobile={isMobile}
            />
        )), [navItems, closeMenu, styles.menuItem.fontSize]);

    return (
        <nav className={`fixed top-0 left-0 right-0 ${navigationConfig.backgroundColor} z-50`} style={styles.navbar}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" style={styles.title} className={`font-bold ${navigationConfig.titleColor} hover:text-red-400 transition-colors`} aria-label="Go to homepage">
                    {navigationConfig.title}
                </Link>
                {isMobile ? (
                    <button
                        onClick={toggleMenu}
                        onKeyPress={handleKeyPress}
                        className="text-white focus:outline-none p-2"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                ) : (
                    <ul className="flex items-center" role="menubar">
                        {renderMenuItems(false)}
                    </ul>
                )}
            </div>
            <AnimatePresence>
                {isMobile && isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`${navigationConfig.mobileMenuBackgroundColor} absolute top-full left-0 right-0`}
                    >
                        <ul className="py-2 px-4" role="menu">
                            {renderMenuItems(true)}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default React.memo(Navigation);