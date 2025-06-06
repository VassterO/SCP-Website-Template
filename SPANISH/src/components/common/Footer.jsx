import React from 'react';
import { motion } from 'framer-motion';
import { footerConfig } from '../../config/footerConfig';

const FooterLink = ({ href, children }) => (
    <motion.a
        href={href}
        className="text-text hover:text-text-light transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.a>
);

const Footer = () => {
    return (
        // THE FIX: Removed 'border-t border-border' to eliminate the hard separation line.
        // The gradient above will now handle the visual transition.
        <footer className="relative text-center p-6 md:p-8">
            <div className="absolute bottom-full left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            <div className="container mx-auto px-4">
                <motion.h2
                    className="font-black text-xl md:text-2xl mb-2 text-text-light"
                    whileHover={{ scale: 1.05 }}
                >
                    {footerConfig.title}<span className="text-primary">.</span>
                </motion.h2>
                <p className="text-text mb-4 text-base max-w-xl mx-auto">
                    {footerConfig.description}
                </p>
                <div className="flex justify-center flex-wrap mb-4 gap-x-6 gap-y-2">
                    {footerConfig.links.map((link, index) => (
                        <FooterLink key={index} href={link.href}>
                            {link.text}
                        </FooterLink>
                    ))}
                </div>
                <p className="text-text-dark text-sm">
                    {footerConfig.copyright}
                </p>
            </div>
        </footer>
    );
};

export default Footer;