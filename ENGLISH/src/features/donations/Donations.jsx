import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScreenAdapter } from '../../utils/ScreenAdapter';
import { donationConfig } from '../../config/donationConfig';
import { usePayPal } from '../../hooks/usePayPal';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const DonationTier = React.memo(({ name, price, benefits, onDonate }) => {
    const { adaptFontSize, adaptSpacing, isBreakpoint } = useScreenAdapter();
    const [isLoading, setIsLoading] = useState(false);

    const styles = useMemo(() => ({
        container: { padding: adaptSpacing(isBreakpoint('lg') ? 24 : 16) },
        title: { fontSize: adaptFontSize(isBreakpoint('lg') ? 24 : 20) },
        list: { fontSize: adaptFontSize(isBreakpoint('md') ? 16 : 14) },
        button: {
            fontSize: adaptFontSize(16),
            padding: `${adaptSpacing(isBreakpoint('lg') ? 12 : 8)} ${adaptSpacing(isBreakpoint('lg') ? 24 : 16)}`
        }
    }), [adaptFontSize, adaptSpacing, isBreakpoint]);

    const handleDonate = async () => {
        setIsLoading(true);
        await onDonate(price, name);
        setIsLoading(false);
    };

    return (
        <motion.div
            className="bg-gray-800 rounded-lg shadow-lg mb-8"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            style={styles.container}
        >
            <h3 className="font-semibold mb-4 text-yellow-400" style={styles.title}>{name} - ${price.toFixed(2)}</h3>
            <ul className="list-disc list-inside space-y-2 mb-6" style={styles.list}>
                {benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
            </ul>
            <motion.button
                className="btn-primary w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={styles.button}
                onClick={handleDonate}
                disabled={isLoading}
            >
                {isLoading ? <LoadingSpinner size="small" /> : donationConfig.buttonText}
            </motion.button>
        </motion.div>
    );
});

function Donations() {
    const { adaptFontSize, adaptSpacing, adaptGridColumns, isBreakpoint } = useScreenAdapter();
    const { paypalLink, handleDonate, error } = usePayPal();

    const styles = useMemo(() => ({
        container: { padding: `${adaptSpacing(isBreakpoint('lg') ? 96 : 64)} 0` },
        title: { fontSize: adaptFontSize(isBreakpoint('lg') ? 48 : 36) }
    }), [adaptFontSize, adaptSpacing, isBreakpoint]);

    return (
        <motion.div
            className="container mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={styles.container}
        >
            <motion.h1 className="font-bold mb-12 text-red-500 text-center" variants={itemVariants} style={styles.title}>
                {donationConfig.pageTitle}
            </motion.h1>
            <motion.div className={`max-w-4xl mx-auto grid gap-8 grid-cols-${adaptGridColumns(3)}`} variants={itemVariants}>
                {donationConfig.donationTiers.map((tier) => (
                    <DonationTier key={tier.id} {...tier} onDonate={handleDonate} />
                ))}
            </motion.div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        className="text-center mt-8 text-red-500"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {error}
                    </motion.p>
                )}
                {paypalLink && (
                    <motion.p
                        className="text-center mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        If the PayPal link didn't open automatically,
                        <a href={paypalLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ml-1">
                            {donationConfig.fallbackLinkText}
                        </a>.
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default React.memo(Donations);