import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../../utils/ScreenAdapter';
import { footerConfig } from '../../config/footerConfig';

const FooterLink = React.memo(({ href, children, className }) => (
    <motion.a
        href={href}
        className={`text-gray-400 hover:text-red-500 transition-colors ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.a>
));

const Footer = () => {
    const { adaptFontSize, adaptSpacing, isBreakpoint } = useScreenAdapter();

    const styles = useMemo(() => ({
        footer: { padding: adaptSpacing(isBreakpoint('lg') ? 32 : 24) },
        title: { fontSize: adaptFontSize(isBreakpoint('lg') ? 24 : 20) },
        description: { fontSize: adaptFontSize(isBreakpoint('md') ? 16 : 14) },
        links: { gap: adaptSpacing(isBreakpoint('md') ? 24 : 16) },
        copyright: { fontSize: adaptFontSize(isBreakpoint('md') ? 14 : 12) }
    }), [adaptFontSize, adaptSpacing, isBreakpoint]);

    return (
        <footer className={`${footerConfig.backgroundColor} text-center`} style={styles.footer}>
            <div className="container mx-auto px-4">
                <motion.h2
                    className={`font-bold ${footerConfig.titleColor} mb-2`}
                    style={styles.title}
                    whileHover={{ scale: 1.05 }}
                >
                    {footerConfig.title}
                </motion.h2>
                <motion.p
                    className={`${footerConfig.descriptionColor} mb-3`}
                    style={styles.description}
                >
                    {footerConfig.description}
                </motion.p>
                <div className={`flex justify-center mb-3`} style={styles.links}>
                    {footerConfig.links.map((link, index) => (
                        <FooterLink key={index} href={link.href}>
                            {link.text}
                        </FooterLink>
                    ))}
                </div>
                <motion.p className="text-gray-600" style={styles.copyright}>
                    {footerConfig.copyright}
                </motion.p>
            </div>
        </footer>
    );
};

export default React.memo(Footer);