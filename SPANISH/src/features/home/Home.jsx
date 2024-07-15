import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useScreenAdapter } from '../../utils/ScreenAdapter';
import { homeConfig } from '../../config/homeConfig';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const Button = React.memo(({ text, link, type, className, fontSize }) => {
    const controls = useAnimation();

    const handleHover = useCallback(() => {
        controls.start({ scale: 1.05 });
    }, [controls]);

    const handleHoverEnd = useCallback(() => {
        controls.start({ scale: 1 });
    }, [controls]);

    const props = type === 'external'
        ? { href: link, target: "_blank", rel: "noopener noreferrer" }
        : { to: link };
    const Component = type === 'external' ? motion.a : motion(Link);

    return (
        <Component
            className={`btn-primary ${className} w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4`}
            style={{ fontSize }}
            {...props}
            animate={controls}
            onHoverStart={handleHover}
            onHoverEnd={handleHoverEnd}
            whileTap={{ scale: 0.95 }}
        >
            {text}
        </Component>
    );
});

function Home() {
    const { adaptFontSize, isBreakpoint, isMobile } = useScreenAdapter();

    const styles = useMemo(() => ({
        title: { fontSize: adaptFontSize(isBreakpoint('lg') ? 48 : 36) },
        description: { fontSize: adaptFontSize(18) },
        button: { fontSize: adaptFontSize(16) }
    }), [adaptFontSize, isBreakpoint]);

    return (
        <motion.div
            className={`flex-grow ${homeConfig.backgroundColor} flex items-center`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className={`${homeConfig.containerMaxWidth} w-full px-4 mx-auto`}>
                <motion.h1
                    className={`font-bold mb-4 ${homeConfig.titleColor} text-center sm:text-left`}
                    style={styles.title}
                    variants={itemVariants}
                >
                    {homeConfig.title}
                </motion.h1>
                <motion.p
                    className={`mb-6 ${homeConfig.descriptionColor} text-center sm:text-left`}
                    style={styles.description}
                    variants={itemVariants}
                >
                    {homeConfig.description}
                </motion.p>
                <motion.div
                    className={`flex flex-col sm:flex-row ${isMobile ? 'items-stretch' : ''}`}
                    variants={itemVariants}
                >
                    {homeConfig.buttons.map((button, index) => (
                        <Button key={index} {...button} fontSize={styles.button.fontSize} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default React.memo(Home);