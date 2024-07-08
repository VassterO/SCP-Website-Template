import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScreenAdapter } from '../utils/ScreenAdapter';

const RuleItem = React.memo(({ rule, variants, fontSize }) => (
    <motion.li
        variants={variants}
        className="border-b border-gray-700 pb-4 last:border-b-0"
    >
        <span className="font-semibold text-yellow-400" style={{ fontSize }}>{rule.id}. </span>
        <span style={{ fontSize }}>{rule.text}</span>
        <span className="text-red-500 font-semibold ml-2" style={{ fontSize }}>({rule.punishment})</span>
    </motion.li>
));

const Rules = () => {
    const { adaptFontSize, adaptSpacing, isBreakpoint } = useScreenAdapter();

    const serverRules = useMemo(() => [
        { id: 1, text: "Harassment, toxicity, disrespect, or discussing any religious, controversial, or political topics is prohibited", punishment: "2 days ban or permanent ban" },
        // Add more rules here
    ], []);

    const animations = useMemo(() => ({
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
            }
        },
        item: {
            hidden: { x: -20, opacity: 0 },
            visible: {
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 100 }
            }
        }
    }), []);

    return (
        <motion.div
            className="container mx-auto px-4 py-8"
            initial="hidden"
            animate="visible"
            variants={animations.container}
        >
            <motion.h1
                className="text-4xl font-bold mb-6 text-red-500 text-center"
                variants={animations.item}
                style={{ fontSize: adaptFontSize(isBreakpoint('lg') ? 36 : 28) }}
            >
                Server Rules
            </motion.h1>
            <motion.div
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                variants={animations.item}
                style={{ padding: adaptSpacing(24) }}
            >
                <ol className="space-y-4">
                    {serverRules.map(rule => (
                        <RuleItem
                            key={rule.id}
                            rule={rule}
                            variants={animations.item}
                            fontSize={adaptFontSize(isBreakpoint('md') ? 16 : 14)}
                        />
                    ))}
                </ol>
            </motion.div>
        </motion.div>
    );
};

export default React.memo(Rules);