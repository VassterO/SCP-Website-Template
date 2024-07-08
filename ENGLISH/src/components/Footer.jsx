import React from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const FooterLink = React.memo(({ href, children, className }) => (
    <a href={href} className={`text-gray-400 hover:text-red-500 transition-colors ${className}`}>
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
                <h2
                    className="font-bold text-red-500 mb-2"
                    style={{ fontSize: adaptFontSize(isBreakpoint('lg') ? 24 : 20) }}
                >
                    Your Server Name
                </h2>
                <p
                    className="text-gray-400 mb-3"
                    style={{ fontSize: adaptFontSize(isBreakpoint('md') ? 16 : 14) }}
                >
                    Placeholder
                </p>
                <div className={`flex justify-center mb-3`} style={{ gap: adaptSpacing(isBreakpoint('md') ? 24 : 16) }}>
                    <FooterLink href="#">Placeholder</FooterLink>
                    <FooterLink href="#">Placeholder</FooterLink>
                    <FooterLink href="#">Placeholder</FooterLink>
                </div>
                <p
                    className="text-gray-600"
                    style={{ fontSize: adaptFontSize(isBreakpoint('md') ? 14 : 12) }}
                >
                    {/* Enable only if you have copyright. 
                    &copy; 2024 Your Server Name. All rights reserved.
                    */}
                </p>
            </div>
        </motion.footer>
    );
};

export default React.memo(Footer);