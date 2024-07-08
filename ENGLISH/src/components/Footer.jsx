import React from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const FooterLink = React.memo(({ href, children }) => (
    <a href={href} className="text-gray-400 hover:text-red-500 transition-colors">
        {children}
    </a>
));

const Footer = () => {
    const { adaptFontSize, adaptSpacing, isBreakpoint } = useScreenAdapter();

    const footerAnimation = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <motion.footer
            className="bg-gray-900 text-center py-6"
            {...footerAnimation}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-red-500 mb-2" style={{ fontSize: adaptFontSize(isBreakpoint('lg') ? 24 : 20) }}>
                    Your Server Name
                </h2>
                <p className="text-gray-400 mb-3" style={{ fontSize: adaptFontSize(isBreakpoint('md') ? 16 : 14) }}>
                    Placeholder
                </p>
                <div className={`flex justify-center space-x-${isBreakpoint('md') ? '6' : '4'} mb-3`}>
                    <FooterLink href="#">Placeholder</FooterLink>
                    <FooterLink href="#">Placeholder</FooterLink>
                    <FooterLink href="#">Placeholder</FooterLink>
                </div>
                <p className="text-gray-600 text-sm" style={{ fontSize: adaptFontSize(isBreakpoint('md') ? 14 : 12) }}>
                    {/* Enable only if you have copyright.
                        &copy; 2024 Your Server Name. All rights reserved.
                    */}
                </p>
            </div>
        </motion.footer>
    );
};

export default React.memo(Footer);