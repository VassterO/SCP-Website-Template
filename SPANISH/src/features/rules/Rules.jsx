import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../../utils/ScreenAdapter';
import { rulesConfig } from '../../config/rulesConfig';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

const RuleItem = React.memo(({ rule, fontSize }) => (
    <motion.li
        variants={itemVariants}
        className="border-b border-gray-700 pb-4 last:border-b-0 mb-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
        <span className="font-semibold text-yellow-400" style={{ fontSize }}>{rule.id}. </span>
        <span style={{ fontSize }}>{rule.text}</span>
        <span className="text-red-500 font-semibold ml-2" style={{ fontSize }}>({rule.punishment})</span>
    </motion.li>
));

const Rules = () => {
    const { adaptFontSize, adaptSpacing, isBreakpoint, adaptContainerWidth } = useScreenAdapter();

    const styles = useMemo(() => ({
        container: { maxWidth: adaptContainerWidth },
        title: { fontSize: adaptFontSize(isBreakpoint('lg') ? 36 : 28) },
        card: { padding: adaptSpacing(24) },
        rule: { fontSize: adaptFontSize(isBreakpoint('md') ? 16 : 14) }
    }), [adaptFontSize, adaptSpacing, isBreakpoint, adaptContainerWidth]);

    return (
        <motion.div
            className={`container mx-auto px-4 py-8 ${rulesConfig.backgroundColor} flex-grow flex flex-col justify-center`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={styles.container}
        >
            <motion.h1
                className={`font-bold mb-6 ${rulesConfig.titleColor} text-center`}
                variants={itemVariants}
                style={styles.title}
            >
                {rulesConfig.title}
            </motion.h1>
            <motion.div
                className={`${rulesConfig.cardBackgroundColor} rounded-lg shadow-lg`}
                variants={itemVariants}
                style={styles.card}
            >
                <motion.ol className="space-y-4">
                    {rulesConfig.rules.map(rule => (
                        <RuleItem key={rule.id} rule={rule} fontSize={styles.rule.fontSize} />
                    ))}
                </motion.ol>
            </motion.div>
        </motion.div>
    );
};

export default Rules;