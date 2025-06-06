import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { donationConfig } from '../../config/donationConfig';
import { createPayPalDonationUrl } from '../../utils/helpers';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { opacity: 1, transition: { type: "spring", stiffness: 100 } } };

const DonationTier = ({ name, price, benefits, onDonate }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDonate = () => {
        setIsLoading(true);
        onDonate(price, name);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <motion.div
            className="bg-background-light rounded-lg shadow-lg p-6 flex flex-col border border-border transition-all duration-300 hover:border-accent hover:shadow-accent/20"
            variants={itemVariants}
            whileHover={{ y: -5 }}
        >
            <h3 className="font-bold mb-2 text-accent text-xl sm:text-2xl">{name}</h3>
            <p className="font-mono text-3xl mb-4 text-text-light">€{price.toFixed(2)}</p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-text flex-grow">
                {benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
            </ul>
            <motion.button
                className="btn-primary w-full mt-auto"
                onClick={handleDonate}
                disabled={isLoading}
            >
                {isLoading ? <LoadingSpinner size="small" /> : donationConfig.buttonText}
            </motion.button>
        </motion.div>
    );
};

function Donations() {
    const [paypalLink, setPaypalLink] = useState('');
    const handleDonate = useCallback((price, tierName) => {
        const fullUrl = createPayPalDonationUrl(price, tierName);
        setPaypalLink(fullUrl);
        window.open(fullUrl, '_blank');
    }, []);

    return (
        <motion.div
            className="container mx-auto px-4 py-16 md:py-24"
            variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }}
        >
            <motion.h1 className="font-black text-center mb-12 text-3xl sm:text-4xl md:text-5xl text-text-light" variants={itemVariants}>
                {donationConfig.pageTitle}
            </motion.h1>
            <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {donationConfig.donationTiers.map((tier) => (
                    <DonationTier key={tier.id} {...tier} onDonate={handleDonate} />
                ))}
            </div>
            <AnimatePresence>
                {paypalLink && (
                    <motion.p className="text-center mt-8 text-sm text-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        Si el enlace no se abrió, <a href={paypalLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover underline"> {donationConfig.fallbackLinkText}</a>.
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Donations;